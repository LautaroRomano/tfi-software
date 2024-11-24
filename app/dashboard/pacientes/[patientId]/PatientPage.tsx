"use client";
import { DiagnosticoModel, PacienteModel } from "@/Models/dashboard/types";
import { useEffect, useState } from "react";
import { getPatient } from "../functions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PatientPage({ patientDni }: { patientDni: string }) {
  const [data, setData] = useState<PacienteModel | null>(null);
  const [viewDiagnostico, setViewDiagnostico] =
    useState<DiagnosticoModel | null>(null);

  const getData = async (patientDni: string) => {
    const res = await getPatient(patientDni);
    setData(res);
  };

  useEffect(() => {
    if (patientDni) getData(patientDni);
  }, [patientDni]);

  if (!data)
    return (
      <div className="text-center mt-10">Cargando datos del paciente...</div>
    );

  if (viewDiagnostico) {
    return (
      <ViewDiagnostico
        diagnostico={viewDiagnostico}
        onClose={() => setViewDiagnostico(null)}
      />
    );
  }

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
         {/*  <p>
            <span className="font-semibold">Fecha de nacimiento:</span>{" "}
            {data.fechaNacimiento.toLocaleDateString()}
          </p> */}
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
            <button
              className="bg-gray-100 p-4 rounded-lg flex justify-between items-center w-full hover:bg-gray-200"
              onClick={() => setViewDiagnostico(diagnostico)}
            >
              <div key={index} className="flex justify-between items-center">
                <div className="flex gap-4">
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

function ViewDiagnostico({
  diagnostico,
  onClose,
}: {
  diagnostico: DiagnosticoModel;
  onClose: Function;
}) {
  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-8 w-full">
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <div className="flex gap-4 items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => onClose()}>
            <ArrowLeft />
          </Button>
            <h2 className="text-xl font-bold text-start">
              Datos del diagnostico
            </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <p>
            <span className="font-semibold">Diagnostico:</span>{" "}
            {diagnostico.descripcion}
          </p>
        </div>
        <div className="flex w-full h-px bg-gray-300 my-4"></div>
        <div className="flex justify-between gap-4 mb-4 items-center">
          <h3 className="text-lg font-semibold text-center ">
            Historial de evoluciones
          </h3>
          <Button>Nueva evolucion</Button>
        </div>
        <div className="space-y-4">
          {diagnostico.evoluciones.map((evolucion, index) => (
            <button className="bg-gray-100 p-4 rounded-lg flex justify-between items-center w-full hover:bg-gray-200">
              <div
                key={index}
                className="flex justify-between items-center flex-col w-full gap-4"
              >
                <div className="flex gap-4 w-full items-center">
                  <p className="font-semibold text-xl">
                    Evolucion Nº {index + 1}
                  </p>
                  <p className="">
                    Fecha: {evolucion.fecha.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-4 w-full">
                  <p className="font-semibold">Informe:</p>
                  <p className="">{evolucion.informe}</p>
                </div>
                <div className="flex gap-4 w-full">
                  <p className="font-semibold">Nombre del Medico:</p>
                  <p className="">
                    {evolucion.medico.apellido + " " + evolucion.medico.nombre}
                  </p>
                </div>
                <div className="flex gap-4 w-full">
                  <p className="font-semibold">DNI del Medico:</p>
                  <p className="">{evolucion.medico.dni}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
