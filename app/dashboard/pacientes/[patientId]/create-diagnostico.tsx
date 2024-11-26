import { DiagnosticoModel } from "@/Models/dashboard/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { agregarDiagnostico } from "../functions";

interface PropsType {
  isOpen: boolean;
  dni: string;
  reload: Function;
  close: () => void;
}

const createDiagnosticoData: DiagnosticoModel | null = {
  id_diagnostico: 0,
  descripcion: "",
  evoluciones: [],
};

export default function CreateDiagnostico({
  isOpen,
  dni,
  reload,
  close,
}: PropsType) {
  const [data, setData] = useState<DiagnosticoModel | null>(null);

  const handleSubmit = async () => {
    if (!data?.descripcion || data.descripcion.length === 0)
      return alert("Debes agregar una descipcion!");
    await agregarDiagnostico(dni, data.descripcion);
    reload();
    close();
  };

  useEffect(() => {
    if (isOpen) setData(createDiagnosticoData);
  }, [isOpen]);

  const handleChangeData = (name: keyof DiagnosticoModel, value: string) => {
    setData((prev) => (prev ? { ...prev, [name]: value } : null));
    return;
  };

  if (!isOpen) return <></>;

  return (
    <div className="flex absolute top-0 left-0 w-screen h-screen justify-center items-center z-50 bg-[#0005]">
      <div className="flex flex-col gap-4 p-6 border border-gray-300 rounded-lg shadow-md bg-white max-w-4xl">
        <h2 className="font-semibold mb-4 dashboard-title">
          Crear Nuevo Diagnostico
        </h2>
        <div className="grid grid-cols-2 gap-8 m-2">
          <div className="">
            <Label htmlFor={"nombre"} className="font-semibold text-md">
              Descripcion
            </Label>
            <Input
              className="bg-gray-200"
              id={"descripcion"}
              name="descripcion"
              value={data?.descripcion || ""}
              onChange={({ target }) =>
                handleChangeData("descripcion", target.value)
              }
              placeholder={`Ingrese una descripcion`}
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
