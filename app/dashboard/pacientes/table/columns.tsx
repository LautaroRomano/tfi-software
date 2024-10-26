"use client";

import { Patient } from "@/Models/dashboard/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "cuil",
    header: "CUIL",
  },
  {
    accessorKey: "phone",
    header: "Telefono",
  },
  {
    accessorKey: "birthDay",
    header: "Fec Nacimiento",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
