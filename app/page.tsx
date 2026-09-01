import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ShoppingList from "@/components/ShoppingList";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  const items = await prisma.item.findMany({
    orderBy: { createdAt: "desc" },
    include: { addedBy: { select: { name: true } } },
  });

  return (
    <ShoppingList
      initialItems={items.map((i) => ({
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        store: i.store,
        note: i.note,
        addedByName: i.addedBy.name,
        createdAt: i.createdAt.toISOString(),
      }))}
      userName={session.user.name ?? ""}
    />
  );
}
