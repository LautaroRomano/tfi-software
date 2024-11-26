import { EvolucionModel } from "@/Models/dashboard/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { agregarEvolucion } from "../functions";

interface PropsType {
  isOpen: boolean;
  dni: string;
  id_diagnostico: number;
  reload: Function;
  close: () => void;
}

const createEvolucionData: EvolucionModel | null = {
  id_evolucion: 0,
  informe: "",
  fecha: new Date(),
  medico: {
    id_medico: 1,
    apellido: "Romano",
    nombre: "Lautaro",
    email: "lautaro@gmail.com",
    direccion: "Monteros",
    dni: "123456",
    especialidad: "Pediatra",
    fechaNacimiento: new Date(),
    matricula: "999555444",
    telefono: 123456,
  },
};

export default function CreateEvolucion({
  isOpen,
  dni,
  id_diagnostico,
  reload,
  close,
}: PropsType) {
  const [data, setData] = useState<EvolucionModel | null>(null);
  console.log("🚀 ~ data:", data)
  console.log("🚀 ~ dni:", dni)
  console.log("🚀 ~ id_diagnostico:", id_diagnostico)


  const handleSubmit = async () => {
    if (!data?.informe || data.informe.length === 0)
      return alert("Debes agregar una descipcion!");
    const res = await agregarEvolucion(dni,id_diagnostico,data.informe);
    if(!res) return alert('Ocurrio un error!')
    reload();
  };

  useEffect(() => {
    if (isOpen) setData(createEvolucionData);
  }, [isOpen]);

  const handleChangeData = (name: keyof EvolucionModel, value: string) => {
    setData((prev) => (prev ? { ...prev, [name]: value } : null));
    return;
  };

  if (!isOpen) return <></>;

  return (
    <div className="flex absolute top-0 left-0 w-screen h-screen justify-center items-center z-50 bg-[#0005]">
      <div className="flex flex-col gap-4 p-6 border border-gray-300 rounded-lg shadow-md bg-white max-w-4xl">
        <h2 className="font-semibold mb-4 dashboard-title">
          Crear Nueva Evolucion
        </h2>
        <div className="grid grid-cols-2 gap-8 m-2">
          <div className="">
            <Label htmlFor={"nombre"} className="font-semibold text-md">
              Informe
            </Label>
            <Input
              className="bg-gray-200"
              id={"informe"}
              name="informe"
              value={data?.informe || ""}
              onChange={({ target }) =>
                handleChangeData("informe", target.value)
              }
              placeholder={`Ingrese un informe`}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={close}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Guardar</Button>
        </div>
      </div>
    </div>
  );
}
