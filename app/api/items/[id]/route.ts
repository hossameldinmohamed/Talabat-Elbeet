import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "غير مسموح" }, { status: 401 });
  }

  await prisma.item.delete({ where: { id: params.id } }).catch(() => null);

  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "غير مسموح" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const { quantity, store, note } = (body ?? {}) as {
    quantity?: string;
    store?: string;
    note?: string;
  };

  const item = await prisma.item.update({
    where: { id: params.id },
    data: {
      ...(quantity !== undefined ? { quantity } : {}),
      ...(store !== undefined ? { store } : {}),
      ...(note !== undefined ? { note } : {}),
    },
    include: { addedBy: { select: { name: true } } },
  });

  return NextResponse.json({ item });
}
