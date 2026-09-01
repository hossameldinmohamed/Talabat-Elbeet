import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AddItemFlow from "@/components/AddItemFlow";

export const dynamic = "force-dynamic";

export default async function AddPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  const customItems = await prisma.customItem.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <AddItemFlow
      initialCustomItems={customItems.map((c) => ({ name: c.name, categoryId: c.categoryId }))}
    />
  );
}
