"use client";
import { HistoriaClinicaModel, PacienteModel } from "@/Models/dashboard/types";
import CreateEntity from "@/app/dashboard/pacientes/create-entity";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  addPatient,
  deletePatient,
  editPatient,
  getPatients,
} from "./functions";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

const historiaClinica: HistoriaClinicaModel = {
  id_historia_clinica: 0,
  diagnosticos: [],
};

const createPatientData: PacienteModel | null = {
  id_paciente: 0,
  nombre: "",
  apellido: "",
  direccion: "",
  dni: "",
  fechaNacimiento: new Date(),
  email: "",
  telefono: "",
  historiaClinica: historiaClinica,
};

function Pacientes() {
  const [data, setData] = useState<PacienteModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [createPatient, setCreatePatient] = useState<PacienteModel | null>(
    null
  );

  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const deleteId = searchParams.get("delete");

  const router = useRouter();

  const getData = async (search: string) => {
    const res = await getPatients(search);
    console.log("entro despuis");
    setData(res);
  };

  useEffect(() => {
    console.log("estuvo aqui");
    getData("");
  }, []);

  useEffect(() => {
    if (editId && editId.length > 0) {
      const paciente = data.find((f) => f.dni === editId);
      setCreatePatient(paciente || null);
    }
  }, [editId]);

  const handleDeletePaciente = async (paciente: PacienteModel) => {
    const res = await deletePatient(paciente);
    if (res) alert("Eliminado con exito!");
    getData("");
  };

  useEffect(() => {
    if (deleteId && deleteId.length > 0) {
      const paciente = data.find((f) => f.dni === deleteId);
      if (!paciente) return;
      const res = window.confirm("Esta seguro que desea eliminar el paciente?");
      if (res) {
        handleDeletePaciente(paciente);
      }
    }
  }, [deleteId]);

  useEffect(() => {
    if (searchTerm.length === 0) getData("");
  }, [searchTerm]);

  const handleSearch = () => {
    getData(searchTerm);
  };

  const handleChangeCreateEntity = () => {
    setCreatePatient(createPatientData);
  };

  const handleChangeData = (name: keyof PacienteModel, value: string) => {
    if (name === "fechaNacimiento") {
      setCreatePatient((prev) =>
        prev ? { ...prev, fechaNacimiento: new Date(value) } : null
      );
      return;
    }
    setCreatePatient((prev) => (prev ? { ...prev, [name]: value } : null));
    return;
  };

  const handleAddPatient = async (data: PacienteModel) => {
    if (editId) {
      await editPatient(data);
    } else {
      await addPatient(data);
    }
    getPatients("");
    setSearchTerm("");
    setCreatePatient(null);
    router.replace("/dashboard/pacientes");
  };

  return (
    <>
      <CreateEntity
        isEdit={!!editId}
        data={createPatient}
        close={() => {
          setCreatePatient(null);
          router.replace("/dashboard/pacientes");
        }}
        handleChangeData={handleChangeData}
        save={handleAddPatient}
      />
      <div className="container mx-auto px-10 py-4 w-full">
        <div className="flex items-center justify-end gap-4 mb-4">
          <div className="flex">
            <Input
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} className="ml-2">
              Buscar
            </Button>
          </div>
          <Button
            variant="default"
            className="ml-4"
            onClick={handleChangeCreateEntity}
          >
            Nuevo Paciente
          </Button>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}

export default function Home() {
  return <Suspense fallback={<div>Loading...</div>}> <Pacientes /> </Suspense>;
}