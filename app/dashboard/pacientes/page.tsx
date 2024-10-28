"use client";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import { getPatients } from "./functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Patient } from "@/Models/dashboard/types";
import CreateEntity from "@/components/dashboard/create-entity";

const createPatientData: Patient | null = {
  id: "",
  name: "",
  email: "",
  phone: "",
  cuil: "",
  birthDay: "",
};

export default function Home() {
  const [data, setData] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [createPatient, setCreatePatient] = useState<Patient | null>(null);

  const getData = async (search: string) => {
    const res = await getPatients(search);
    setData(res);
  };

  useEffect(() => {
    getData("");
  }, []);

  useEffect(() => {
    if (searchTerm.length === 0) getData("");
  }, [searchTerm]);

  const handleSearch = () => {
    getData(searchTerm);
  };

  const handleChangeCreateEntity = () => {
    setCreatePatient(createPatientData);
  };

  const handleChangeData = (name: keyof Patient, value: string) => {
    setCreatePatient((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  return (
    <>
      <CreateEntity
        data={createPatient}
        close={() => setCreatePatient(null)}
        handleChangeData={handleChangeData}
        save={(data: Patient) => console.log("crear paciente", data)}
        labels={{
          name: "Nombre Completo",
          email: "Correo Electrónico",
          phone: "Teléfono",
          cuil: "CUIL",
          birthDay: "Fecha de nacimiento",
        }}
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
