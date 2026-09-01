import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "غير مسموح" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const { name, categoryId } = (body ?? {}) as { name?: string; categoryId?: string };

  if (!name?.trim() || !categoryId?.trim()) {
    return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
  }

  const customItem = await prisma.customItem.upsert({
    where: { categoryId_name: { categoryId: categoryId.trim(), name: name.trim() } },
    update: {},
    create: { name: name.trim(), categoryId: categoryId.trim() },
  });

  return NextResponse.json({ customItem });
}
