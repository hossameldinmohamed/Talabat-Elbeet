import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "غير مسموح" }, { status: 401 });
  }

  const items = await prisma.item.findMany({
    orderBy: { createdAt: "desc" },
    include: { addedBy: { select: { name: true } } },
  });

  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!session?.user || !userId) {
    return NextResponse.json({ error: "غير مسموح" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const { name, quantity, store, note } = body as {
    name?: string;
    quantity?: string;
    store?: string;
    note?: string;
  };

  if (!name || !name.trim()) {
    return NextResponse.json({ error: "اسم الصنف مطلوب" }, { status: 400 });
  }

  const item = await prisma.item.create({
    data: {
      name: name.trim(),
      quantity: quantity?.trim() || "1",
      store: store || "ANY",
      note: note?.trim() || null,
      addedById: userId,
    },
    include: { addedBy: { select: { name: true } } },
  });

  return NextResponse.json({ item });
}
