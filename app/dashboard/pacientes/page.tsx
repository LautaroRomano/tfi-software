"use client";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import { addPatient, getPatients } from "./functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { HistoriaClinicaModel, PacienteModel } from "@/Models/dashboard/types";
import CreateEntity from "@/app/dashboard/pacientes/create-entity";
import { useSearchParams } from "next/navigation";

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
  telefono: 0,
  historiaClinica: historiaClinica,
};

export default function Home() {
  const [data, setData] = useState<PacienteModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [createPatient, setCreatePatient] = useState<PacienteModel | null>(
    null
  );

  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const deleteId = searchParams.get("delete");

  const getData = async (search: string) => {
    const res = await getPatients(search);
    setData(res);
  };

  useEffect(() => {
    getData("");
  }, []);

  useEffect(() => {
    if (editId && editId.length > 0) {
      const paciente = data.find((f) => f.id_paciente === parseInt(editId));
      setCreatePatient(paciente || null);
    }
  }, [editId]);

  useEffect(() => {
    if (deleteId && deleteId.length > 0) {
      const paciente = data.find((f) => f.id_paciente === parseInt(deleteId));
      const res = window.confirm("Esta seguro que desea eliminar el paciente?");
      if (res) console.log("🚀 Eliminar paciente", paciente);
      else console.log("🚀 Cancelar eliminacio (salvao)", paciente);
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

  const handleAddPatient = async(data: PacienteModel)=>{
    const res = await addPatient(data);
    getPatients('');
    setSearchTerm('');
    setCreatePatient(null);
  }

  return (
    <>
      <CreateEntity
        data={createPatient}
        close={() => setCreatePatient(null)}
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
