"use client";

import { Button } from "@/components/ui/button";
import { Patient } from "@/Models/dashboard/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash } from "lucide-react";

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">Nombre</div>
    ),
  },
  {
    accessorKey: "cuil",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">CUIL</div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">Telefono</div>
    ),
  },
  {
    accessorKey: "birthDay",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">
        Fec Nacimiento
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">Email</div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">actions</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-5">
          <Button variant="ghost" size="icon">
              <Eye />
          </Button>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
