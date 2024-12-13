"use client";
import { DiagnosticoModel, PacienteModel } from "@/Models/dashboard/types";
import { useEffect, useState } from "react";
import { eliminarDiagnostico, getPatient } from "../functions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CreateDiagnostico from "./create-diagnostico";
import CreateEvolucion from "./create-evolucion";
import { Pencil, Trash2, Eye } from "lucide-react";

export default function PatientPage({ patientDni }: { patientDni: string }) {
  const [data, setData] = useState<PacienteModel | null>(null);
  const [viewDiagnostico, setViewDiagnostico] =
    useState<DiagnosticoModel | null>(null);
  const [newDiagnostico, setNewDiagnostico] = useState(false);
  const [editDiagnostico, setEditDiagnostico] =
    useState<DiagnosticoModel | null>(null);
  const getData = async (patientDni: string) => {
    const res = await getPatient(patientDni);
    setData(res);
    if(!!viewDiagnostico) setViewDiagnostico(res?.historiaClinica.diagnosticos.find(d => d.id_diagnostico === viewDiagnostico.id_diagnostico) || null);
  };

  useEffect(() => {
    if (patientDni) getData(patientDni);
  }, [patientDni]);

  const handleDeleteDiagnostico = async (diagnostico: DiagnosticoModel) => {
    const res = confirm("Estas seguro que deseas eliminar este diagnostico?");
    if (res) {
      await eliminarDiagnostico(diagnostico.id_diagnostico, patientDni);
      getData(patientDni);
    }
  };

  if (!data)
    return (
      <div className="text-center mt-10">Cargando datos del paciente...</div>
    );

  if (viewDiagnostico) {
    return (
      <ViewDiagnostico
        patientDni={patientDni}
        diagnostico={viewDiagnostico}
        onClose={() => setViewDiagnostico(null)}
        reload={() => getData(patientDni)}
      />
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-8 w-full">
      <CreateDiagnostico
        close={() => setNewDiagnostico(false)}
        dni={patientDni}
        editDiagnostico={editDiagnostico}
        isOpen={newDiagnostico}
        reload={() => {
          getData(patientDni);
          setNewDiagnostico(false);
        }}
      />
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
        <div className="flex justify-between gap-4 mb-4 items-center">
          <h3 className="text-lg font-semibold text-center mb-4">
            Historia Clínica
          </h3>
          <div>
            <Button onClick={() => setNewDiagnostico(true)}>
              Nuevo diagnostico
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {data.historiaClinica.diagnosticos.map((diagnostico, index) => (
            <div className="flex gap-2 items-center" key={index}>
              <button
                key={index}
                className="bg-gray-100 p-4 rounded-lg flex justify-between items-center w-full hover:bg-gray-200"
                onClick={() => setViewDiagnostico(diagnostico)}
              >
                <div
                  key={index}
                  className="flex justify-between items-center w-full"
                >
                  <div className="flex gap-4">
                    <p className="font-semibold">
                      Diagnóstico: {diagnostico.descripcion}
                    </p>
                  </div>
                </div>
              </button>
              <Button onClick={() => setViewDiagnostico(diagnostico)}>
                {" "}
                <Eye />{" "}
              </Button>
              <Button
                onClick={() => {
                  setEditDiagnostico(diagnostico);
                  setNewDiagnostico(true);
                }}
              >
                {" "}
                <Pencil />
              </Button>
              <Button onClick={() => handleDeleteDiagnostico(diagnostico)}>
                {" "}
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ViewDiagnostico({
  patientDni,
  diagnostico,
  onClose,
  reload,
}: {
  patientDni: string;
  diagnostico: DiagnosticoModel;
  onClose: ()=>void;
  reload: ()=>void;
}) {
  const [newEvolucion, setNewEvolucion] = useState(false);
  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-8 w-full">
      <CreateEvolucion
        close={() => setNewEvolucion(false)}
        dni={patientDni}
        id_diagnostico={diagnostico.id_diagnostico}
        isOpen={newEvolucion}
        reload={() => {
          reload();
          setNewEvolucion(false)
        }}
      />
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
          <Button onClick={() => setNewEvolucion(true)}>Nueva evolucion</Button>
        </div>
        <div className="space-y-4">
          {diagnostico.evoluciones.map((evolucion, index) => {
            console.log(evolucion)
            return (
            <button key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center w-full hover:bg-gray-200">
              <div
                key={index}
                className="flex justify-between items-center flex-col w-full gap-4"
              >
                <div className="flex gap-4 w-full items-center">
                  <p className="font-semibold text-xl">
                    Evolucion Nº {index + 1}
                  </p>
                  {/*  <p className="">
                    Fecha: {evolucion.fecha.toLocaleDateString()}
                  </p> */}
                </div>
                <div className="flex gap-4 w-full">
                  <p className="font-semibold">Informe:</p>
                  <p className="">{evolucion.informe}</p>
                </div>
                <div className="flex gap-4 w-full">
                  <p className="font-semibold">Nombre del Medico:</p>
                  <p className="">
                    {
                      evolucion?.doctor || "Juan Perez"
                    }
                  </p>
                </div>

                {evolucion.receta?.medicamentos && evolucion.receta.medicamentos.length > 0 && (
                    <div className="flex flex-col gap-4 w-full mt-4">
                      <p className="font-semibold">Medicamentos:</p>
                      {evolucion.receta.medicamentos.map((medicamento, medIndex) => (
                          <div key={medIndex} className="flex flex-col gap-4 w-full">
                            <div className="flex gap-4 w-full">
                              <p className="font-semibold">Nombre comercial:</p>
                              <p>{medicamento.nombreComercial!}</p>
                            </div>
                            <div className="flex gap-4 w-full">
                              <p className="font-semibold">Nombre genérico:</p>
                              <p>{medicamento.nombreGenerico!}</p>
                            </div>
                            <div className="flex gap-4 w-full">
                              <p className="font-semibold">Presentación:</p>
                              <p>{medicamento.presentacion!}</p>
                            </div>
                            <div className="flex gap-4 w-full">
                              <p className="font-semibold">Cantidad:</p>
                              <p>{medicamento.cantidad}</p>
                            </div>
                            {
                              evolucion.receta && medIndex !== evolucion.receta.medicamentos.length - 1 &&
                              <div className="flex w-full h-px bg-gray-500"></div>
                            }
                          </div>
                      ))}
                    </div>
                )}
                {evolucion.pedidoLaboratorio?.descripcion && evolucion.pedidoLaboratorio.descripcion.length > 0 && (
                    <div className="flex flex-col gap-4 w-full mt-4">
                      <p className="font-semibold">Pedido de laboratorio:</p>
                        <div className="flex flex-col gap-4 w-full">
                          <div className="flex gap-4 w-full">
                            <p className="font-semibold">Descripcion:</p>
                            <p>{evolucion.pedidoLaboratorio.descripcion}</p>
                          </div>
                        </div>
                    </div>
                )}


              </div>
            </button>
          )})}
        </div>
      </div>
    </div>
  );
}
