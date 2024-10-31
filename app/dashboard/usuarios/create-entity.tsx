import { User } from "@/Models/dashboard/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PropsType = {
  data: null | User;
  handleChangeData: (name: keyof User, value: string) => void;
  save: (data: User) => void;
  close: () => void;
  labels: { [key in keyof User]?: string };
};

export default function CreateEntity({
  data,
  handleChangeData,
  save,
  close,
  labels,
}: PropsType) {
  if (!data) return null;

  const handleSubmit = () => {
    save(data);
  };

  return (
    <div className="flex absolute top-0 left-0 w-screen h-screen justify-center items-center z-50 bg-[#0005]">
      <div className="flex flex-col gap-4 p-6 border border-gray-300 rounded-lg shadow-md bg-white max-w-4xl">
        <h2 className="text-lg font-semibold mb-4 dashboard-title">
          Crear Nuevo Paciente
        </h2>
        <div className="grid grid-cols-2 gap-8 m-4">
        {(Object.keys(labels) as (keyof User)[]).map((key) => (
            <div key={key} className="">
              <Label htmlFor={key} className="font-semibold text-md">
                {labels[key] || key}
              </Label>
              <Input
                className="bg-gray-200"
                id={key}
                value={data[key as keyof User] || ""}
                onChange={(e) =>
                  handleChangeData(key as keyof User, e.target.value)
                }
                placeholder={`Ingrese ${labels[key] || key}`}
              />
            </div>
          ))}
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
