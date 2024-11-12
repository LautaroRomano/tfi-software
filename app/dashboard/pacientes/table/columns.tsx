"use client";

import { Button } from "@/components/ui/button";
import { PacienteModel } from "@/Models/dashboard/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<PacienteModel>[] = [
  {
    accessorKey: "nombre",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">Nombre</div>
    ),
  },
  {
    accessorKey: "apellido",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">Apellido</div>
    ),
  },
  {
    accessorKey: "direccion",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">Dirección</div>
    ),
  },
  {
    accessorKey: "dni",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">DNI</div>
    ),
  },
  {
    accessorKey: "fechaNacimiento",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">
        Fecha de Nacimiento
      </div>
    ),
    cell: ({ row }) => (
      <div>{row.original.fechaNacimiento.toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">Email</div>
    ),
  },
  {
    accessorKey: "telefono",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">Telefono</div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">Acciones</div>
    ),
    cell: ({ row }) => {
      const router = useRouter();
      const patientId = row.original.id_paciente;
      return (
        <div className="flex gap-5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.replace(`/dashboard/pacientes/${patientId}`)}
          >
            <Eye />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => router.replace(`/dashboard/pacientes?edit=${patientId}`)}>
            <Edit />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => router.replace(`/dashboard/pacientes?delete=${patientId}`)}>
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
