import MenuDialog from "@/modules/menu/components/MenuDialog";
import MenuTable from "@/modules/menu/components/MenuTable";

export default function Page() {
  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          اطلاعات پایه
        </h1>

        <MenuDialog />

      </div>

      <MenuTable />

    </div>
  );
}