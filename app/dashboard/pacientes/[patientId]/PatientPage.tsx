"use client";
import { PacienteModel } from "@/Models/dashboard/types";
import { useEffect, useState } from "react";
import { getPatient } from "../functions";

export default function PatientPage({ patientId }: { patientId: number }) {
  const [data, setData] = useState<PacienteModel | null>(null);

  const getData = async (patientId: number) => {
    const res = await getPatient(patientId);
    setData(res);
  };

  useEffect(() => {
    if (patientId) getData(patientId);
  }, [patientId]);

  if (!data)
    return (
      <div className="text-center mt-10">Cargando datos del paciente...</div>
    );

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-8 w-full">
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-start mb-4">
          Datos del paciente
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <p>
            <span className="font-semibold">Nombre completo:</span>{" "}
            {data.nombre} {data.apellido}
          </p>
          <p>
            <span className="font-semibold">Direccion:</span> {data.direccion}
          </p>
          <p>
            <span className="font-semibold">DNI:</span> {data.dni}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {data.email}
          </p>
          <p>
            <span className="font-semibold">Fecha de nacimiento:</span>{" "}
            {data.fechaNacimiento.toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Telefono:</span> {data.telefono}
          </p>
        </div>
        <div className="flex w-full h-px bg-gray-300 my-4"></div>
        <h3 className="text-lg font-semibold text-center mb-4">
          Historia Clínica
        </h3>
        <div className="space-y-4">
          {data.historiaClinica.diagnosticos.map((diagnostico, index) => (
            <button className="bg-gray-100 p-4 rounded-lg flex justify-between items-center w-full hover:bg-gray-200">
              <div
                key={index}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    Diagnóstico: {diagnostico.descripcion}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
