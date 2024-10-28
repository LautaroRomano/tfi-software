"use client";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import { getPatients } from "./functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Patient } from "@/Models/dashboard/types";

export default function Home() {
  const [data, setData] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
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
        <Button variant="default" className="ml-4">
          Nuevo Paciente
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
