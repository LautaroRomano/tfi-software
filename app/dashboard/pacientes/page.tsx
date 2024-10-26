import { Patient } from "@/Models/dashboard/types";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

async function getData(): Promise<Patient[]> {
  return [
    {
      id: "728ed52f",
      name: "Lautaro Romano",
      cuil: "20-43846366-7",
      phone: "3865513846",
      birthDay: "25-04-2002",
      email: "lautarooyt837@gmail.com",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10 w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
