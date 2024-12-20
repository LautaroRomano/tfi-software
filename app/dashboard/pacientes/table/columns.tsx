"use client";

import { Button } from "@/components/ui/button";
import { PacienteModel } from "@/Models/dashboard/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash } from "lucide-react";

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
  /*  {
    accessorKey: "direccion",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">Dirección</div>
    ),
  }, */
  {
    accessorKey: "dni",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">DNI</div>
    ),
  },
  /* {
    accessorKey: "fechaNacimiento",
    header: () => (
      <div className="text-start text-titlePrimary font-bold">
        Fecha de Nacimiento
      </div>
    ),
    cell: ({ row }) => (
      <div>{row.original.fechaNacimiento.toLocaleDateString()}</div>
    ),
  }, */
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
      const patientDni = row.original.dni;
      return (
        <div className="flex gap-5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
                window.location.href = `/dashboard/pacientes/${patientDni}`;
            }}
          >
            <Eye />
          </Button>
          <Button
            disabled
            variant="ghost"
            size="icon"
            onClick={() => {
              window.location.href = `/dashboard/pacientes?edit=${patientDni}`
            }}
          >
            <Edit />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              window.location.href = `/dashboard/pacientes?delete=${patientDni}`
            }}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
