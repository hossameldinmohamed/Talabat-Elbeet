import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "بيانات غير صحيحة" }, { status: 400 });
    }

    const { email, password, inviteCode } = body as {
      email?: string;
      password?: string;
      inviteCode?: string;
    };

    if (!email || !password || !inviteCode) {
      return NextResponse.json({ error: "من فضلك املأ كل الحقول" }, { status: 400 });
    }

    if (inviteCode !== process.env.REGISTRATION_CODE) {
      return NextResponse.json({ error: "كود الدعوة غير صحيح" }, { status: 403 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "كلمة السر لازم تكون 6 حروف/أرقام على الأقل" },
        { status: 400 }
      );
    }

    const maxUsers = Number(process.env.MAX_USERS ?? 2);
    const usersCount = await prisma.user.count();
    if (usersCount >= maxUsers) {
      return NextResponse.json(
        { error: "تم إنشاء كل الحسابات المسموح بها بالفعل" },
        { status: 403 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return NextResponse.json({ error: "في حساب بالفعل بهذا البريد" }, { status: 409 });
    }

    const name = normalizedEmail.split("@")[0];
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, email: normalizedEmail, passwordHash },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("register error", err);
    return NextResponse.json({ error: "حصل خطأ في السيرفر، حاول تاني" }, { status: 500 });
  }
}
