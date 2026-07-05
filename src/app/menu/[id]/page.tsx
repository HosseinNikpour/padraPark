import { prisma } from "@/lib/prisma";
import EditForm from "@/modules/menu/components/EditForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = await prisma.menuItem.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!item) {
    return <div>پیدا نشد</div>;
  }

  return (
    <div className="max-w-xl space-y-6">

      <h1 className="text-2xl font-bold">
        ویرایش آیتم
      </h1>

      <EditForm item={item} />

    </div>
  );
}