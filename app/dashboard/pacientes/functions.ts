import { PacienteModel } from "@/Models/dashboard/types";
import axios from "axios";
import { config } from "@/lib/utils";

const headers ={
  'ngrok-skip-browser-warning': 'true',
  'Content-Type': 'application/json',
}
const axiosInstance = axios.create({headers:headers})



export async function getPatients(search: string): Promise<PacienteModel[]> {
  try {
    const { data: res } = await axiosInstance.get(`${config.HOST}/paciente`,
        {
          headers: headers
        });
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
    const { data: res } = await axiosInstance.get(`${config.HOST}/paciente`,{headers:headers});

    const { data } = res;

    const paciente = data.filter((p: PacienteModel) => p.dni === dni)[0];

    console.log("EL paciente tiene lo siguiente",paciente)

    return paciente;
  } catch (error) {
    console.log("🚀 ~ getPatients ~ error:", error);
    return null;
  }
}

export async function addPatient(paciente: PacienteModel): Promise<boolean> {
  try {
    const { data: res } = await axios.post(`${config.HOST}/paciente`, paciente);
    return !!res;
  } catch (error) {
    console.log("🚀 ~ getPatients ~ error:", error);
    return false;
  }
}

export async function editPatient(paciente: PacienteModel): Promise<boolean> {
  try {
    const { data: res } = await axios.put(`${config.HOST}/paciente/${paciente.dni}`, paciente);
    return !!res;
  } catch (error) {
    console.log("🚀 ~ getPatients ~ error:", error);
    return false;
  }
}

export async function deletePatient(paciente: PacienteModel): Promise<boolean> {
  try {
    const { data: res } = await axios.delete(
      `${config.HOST}/paciente/${paciente.dni}`
    );
    return !!res;
  } catch (error) {
    console.log("🚀 ~ getPatients ~ error:", error);
    return false;
  }
}

export async function agregarDiagnostico(
  dni: string,
  descripcion: string
): Promise<boolean> {
  try {
    const { data: res } = await axios.post(
      `${config.HOST}/paciente/${dni}/diagnostico`,
      { descripcion }
    );
    return !!res;
  } catch (error) {
    console.log("🚀 ~ getPatients ~ error:", error);
    return false;
  }
}

export async function editarDiagnostico(
  id_diagnostico: number,
  dni: string,
  descripcion: string
): Promise<boolean> {
  try {
    const { data: res } = await axios.put(
      `${config.HOST}/paciente/${dni}/diagnostico/${id_diagnostico}`,
      { descripcion }
    );
    return !!res;
  } catch (error) {
    console.log("🚀 ~ getPatients ~ error:", error);
    return false;
  }
}

export async function eliminarDiagnostico(
  id_diagnostico: number,
  dni: string
): Promise<boolean> {
  try {
    const { data: res } = await axios.delete(
      `${config.HOST}/paciente/${dni}/diagnostico/${id_diagnostico}`
    );
    return !!res;
  } catch (error) {
    console.log("🚀 ~ getPatients ~ error:", error);
    return false;
  }
}

export async function agregarEvolucion(
    dni: string,
    id_diagnostico: number,
    informe: any
): Promise<boolean> {
  try {
    const { data: res } = await axiosInstance.post(
        `${config.HOST}/paciente/${dni}/diagnostico/${id_diagnostico}/evolucion`,
        informe
    );
    return !!res;
  } catch (error) {
    console.log("🚀 ~ getPatients ~ error:", error);
    return false;
  }
}

export const getAllMedications = async (pagina: number = 1, limite: number = 10) => {
  try {
    const response = await axios.get(`${config.NEW_HOST}/api/servicio-salud/medicamentos/todos`, {
      params: { pagina, limite },
    });
    console.log("🚀 ~ response:", response);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los medicamentos:", error);
    return [];
  }
};
