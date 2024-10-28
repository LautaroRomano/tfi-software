import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import { getPatients } from "./functions";

export default async function DemoPage() {
  const data = await getPatients();

  return (
    <div className="container mx-auto p-10 w-full">
      <div></div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
