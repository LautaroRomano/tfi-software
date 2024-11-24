import { HistoriaClinicaModel, PacienteModel } from "@/Models/dashboard/types";
import axios from "axios";
import { config } from "@/lib/utils";

export async function getPatients(search: string): Promise<PacienteModel[]> {
  try {
    const { data: res } = await axios.get(`${config.HOST}/paciente`);
    const { data } = res;

    const pacientes = data.filter(
      (p: PacienteModel) =>
        search.length === 0 ||
        p.apellido.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        p.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        p.dni.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    return pacientes;
  } catch (error) {
    console.log("🚀 ~ getPatients ~ error:", error);
    return Promise.resolve([]);
  }
}

export async function getPatient(dni: string): Promise<PacienteModel | null> {
  try {
    const { data: res } = await axios.get(`${config.HOST}/paciente`);
    const { data } = res;

    const paciente = data.filter((p: PacienteModel) => p.dni === dni)[0];

    return paciente;
  } catch (error) {
    console.log("🚀 ~ getPatients ~ error:", error);
    return null;
  }
}

const historiaClinica: HistoriaClinicaModel = {
  id_historia_clinica: 0,
  diagnosticos: [],
};

const testPatients = [
  {
    id_paciente: 1,
    nombre: "Carlos",
    apellido: "Aguilar",
    email: "carlosaguilar321@gmail.com",
    direccion: "calle 1 - 456",
    dni: "43789912",
    fechaNacimiento: new Date(),
    telefono: 381456789,
    historiaClinica: {
      id_historia_clinica: 1,
      diagnosticos: [
        {
          id: 1,
          fecha: new Date("2021-04-2"),
          descripcion: "Dengue",
          evoluciones: [
            {
              id_evolucion: 1,
              fecha: new Date("2021-04-15"),
              informe: "Ejemplo de informe de la evolucion",
              medico: {
                nombre: "Homero",
                apellido: "Simson",
                dni: "7897897",
                fechaNacimiento: new Date("01-11-2024"),
                email: "homero@gmail.com",
                telefono: 3865456789,
                direccion: "Av. siempreviva",
                matricula: "123456789",
                especialidad: "Endocrologo",
              },
            },
            {
              id_evolucion: 2,
              fecha: new Date("2021-04-15"),
              informe: "Ejemplo de informe de la evolucion",
              medico: {
                nombre: "Homero",
                apellido: "Simson",
                dni: "7897897",
                fechaNacimiento: new Date("01-11-2024"),
                email: "homero@gmail.com",
                telefono: 3865456789,
                direccion: "Av. siempreviva",
                matricula: "123456789",
                especialidad: "Endocrologo",
              },
            },
          ],
        },
        {
          id: 2,
          fecha: new Date("2021-04-2"),
          descripcion: "Viruela del macaco",
          evoluciones: [
            {
              id_evolucion: 1,
              fecha: new Date("2021-04-15"),
              informe: "destalle de la evolucion",
              medico: {
                nombre: "Homero",
                apellido: "Simson",
                dni: "7897897",
                fechaNacimiento: new Date("01-11-2024"),
                email: "homero@gmail.com",
                telefono: 3865456789,
                direccion: "Av. siempreviva",
                matricula: "123456789",
                especialidad: "Endocrologo",
              },
            },
          ],
        },
        {
          id: 1,
          fecha: new Date("2021-04-2"),
          descripcion: "Sida",
          evoluciones: [
            {
              id_evolucion: 1,
              fecha: new Date("2021-04-15"),
              informe: "destalle de la evolucion",
              medico: {
                nombre: "Homero",
                apellido: "Simson",
                dni: "7897897",
                fechaNacimiento: new Date("01-11-2024"),
                email: "homero@gmail.com",
                telefono: 3865456789,
                direccion: "Av. siempreviva",
                matricula: "123456789",
                especialidad: "Endocrologo",
              },
            },
          ],
        },
      ],
    },
  },
  {
    id_paciente: 2,
    nombre: "Ana",
    apellido: "López",
    email: "ana.lopez@gmail.com",
    direccion: "calle 2 - 789",
    dni: "35467821",
    fechaNacimiento: new Date("1990-04-15"),
    telefono: 381987654,
    historiaClinica: historiaClinica,
  },
  {
    id_paciente: 3,
    nombre: "Luis",
    apellido: "Martínez",
    email: "luis.martinez@yahoo.com",
    direccion: "calle 3 - 321",
    dni: "37456432",
    fechaNacimiento: new Date("1985-11-20"),
    telefono: 381123456,
    historiaClinica: historiaClinica,
  },
  {
    id_paciente: 4,
    nombre: "Sofía",
    apellido: "González",
    email: "sofia.gonzalez@hotmail.com",
    direccion: "calle 4 - 654",
    dni: "38765423",
    fechaNacimiento: new Date("1992-06-05"),
    telefono: 381654987,
    historiaClinica: historiaClinica,
  },
  {
    id_paciente: 5,
    nombre: "Juan",
    apellido: "Rodríguez",
    email: "juan.rodriguez@gmail.com",
    direccion: "calle 5 - 852",
    dni: "34871256",
    fechaNacimiento: new Date("1978-01-30"),
    telefono: 381456123,
    historiaClinica: historiaClinica,
  },
  {
    id_paciente: 6,
    nombre: "Marta",
    apellido: "Pérez",
    email: "marta.perez@outlook.com",
    direccion: "calle 6 - 963",
    dni: "37986143",
    fechaNacimiento: new Date("1995-09-10"),
    telefono: 381654321,
    historiaClinica: historiaClinica,
  },
  {
    id_paciente: 7,
    nombre: "Pedro",
    apellido: "Sánchez",
    email: "pedro.sanchez@gmail.com",
    direccion: "calle 7 - 147",
    dni: "36451234",
    fechaNacimiento: new Date("1980-07-22"),
    telefono: 381879654,
    historiaClinica: historiaClinica,
  },
  {
    id_paciente: 8,
    nombre: "Claudia",
    apellido: "Fernández",
    email: "claudia.fernandez@live.com",
    direccion: "calle 8 - 258",
    dni: "35987456",
    fechaNacimiento: new Date("1989-12-11"),
    telefono: 381321654,
    historiaClinica: historiaClinica,
  },
  {
    id_paciente: 9,
    nombre: "Ricardo",
    apellido: "Ramírez",
    email: "ricardo.ramirez@gmail.com",
    direccion: "calle 9 - 369",
    dni: "34678923",
    fechaNacimiento: new Date("1975-03-03"),
    telefono: 381654789,
    historiaClinica: historiaClinica,
  },
  {
    id_paciente: 10,
    nombre: "Lucía",
    apellido: "Torres",
    email: "lucia.torres@yahoo.com",
    direccion: "calle 10 - 258",
    dni: "36874956",
    fechaNacimiento: new Date("1993-08-17"),
    telefono: 381987321,
    historiaClinica: historiaClinica,
  },
  {
    id_paciente: 11,
    nombre: "Martín",
    apellido: "Díaz",
    email: "martin.diaz@gmail.com",
    direccion: "calle 11 - 357",
    dni: "37265419",
    fechaNacimiento: new Date("1998-02-25"),
    telefono: 381246888,
    historiaClinica: historiaClinica,
  },
];
