import { PacienteModel } from "@/Models/dashboard/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PropsType {
  data: null | PacienteModel;
  handleChangeData: (name: keyof PacienteModel, value: string) => void;
  save: (data: PacienteModel) => void;
  close: () => void;
}

export default function CreateEntity({
  data,
  handleChangeData,
  save,
  close,
}: PropsType) {
  if (!data) return null;

  const handleSubmit = () => {
    save(data);
  };

  return (
    <div className="flex absolute top-0 left-0 w-screen h-screen justify-center items-center z-50 bg-[#0005]">
      <div className="flex flex-col gap-4 p-6 border border-gray-300 rounded-lg shadow-md bg-white max-w-4xl">
        <h2 className="font-semibold mb-4 dashboard-title">
          {data?.dni && data.dni.length > 0
            ? "Actualizar datos"
            : "Crear Nuevo Paciente"}
        </h2>
        <div className="grid grid-cols-2 gap-8 m-2">
          <div className="">
            <Label htmlFor={"nombre"} className="font-semibold text-md">
              Nombre
            </Label>
            <Input
              className="bg-gray-200"
              id={"nombre"}
              name="nombre"
              value={data.nombre}
              onChange={({ target }) =>
                handleChangeData("nombre", target.value)
              }
              placeholder={`Ingrese el nombre`}
            />
          </div>
          <div className="">
            <Label htmlFor={"apellido"} className="font-semibold text-md">
              Apellido
            </Label>
            <Input
              className="bg-gray-200"
              id={"apellido"}
              name="apellido"
              value={data.apellido}
              onChange={({ target }) =>
                handleChangeData("apellido", target.value)
              }
              placeholder={`Ingrese el apellido`}
            />
          </div>
          <div className="">
            <Label htmlFor={"direccion"} className="font-semibold text-md">
              Direccion
            </Label>
            <Input
              className="bg-gray-200"
              id={"direccion"}
              name="direccion"
              value={data.direccion}
              onChange={({ target }) =>
                handleChangeData("direccion", target.value)
              }
              placeholder={`Ingrese el direccion`}
            />
          </div>
          <div className="">
            <Label htmlFor={"dni"} className="font-semibold text-md">
              DNI
            </Label>
            <Input
              className="bg-gray-200"
              id={"dni"}
              name="dni"
              value={data.dni}
              onChange={({ target }) => handleChangeData("dni", target.value)}
              placeholder={`Ingrese el dni`}
            />
          </div>

          <div className="">
            <Label htmlFor={"email"} className="font-semibold text-md">
              Email
            </Label>
            <Input
              className="bg-gray-200"
              id="email"
              name="email"
              value={data.email}
              onChange={({ target }) => handleChangeData("email", target.value)}
              placeholder="Ingrese el email"
            />
          </div>

          <div className="">
            <Label
              htmlFor={"fechaNacimiento"}
              className="font-semibold text-md"
            >
              Fecha de Nacimiento
            </Label>
            <Input
              type="date"
              className="bg-gray-200"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formatDateToString(data.fechaNacimiento)} // convierte Date a string para el input
              onChange={({ target }) =>
                handleChangeData("fechaNacimiento", target.value)
              }
              placeholder="Ingrese la fechaNacimiento"
            />
          </div>

          <div className="">
            <Label htmlFor={"telefono"} className="font-semibold text-md">
              Telefono
            </Label>
            <Input
              type="number"
              className="bg-gray-200"
              id="telefono"
              name="telefono"
              value={data.telefono}
              onChange={({ target }) =>
                handleChangeData("telefono", target.value)
              }
              placeholder="Ingrese el telefono"
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

// Función para convertir Date a string en formato YYYY-MM-DD
const formatDateToString = (date: Date | null): string => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // mes en 2 dígitos
  const day = String(date.getDate()).padStart(2, "0"); // día en 2 dígitos
  return `${year}-${month}-${day}`;
};
