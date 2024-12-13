import { config, getToken } from "@/lib/utils";
import { PacienteModel } from "@/Models/dashboard/types";
import axios from "axios";

const token = getToken();
const headers = {
  "ngrok-skip-browser-warning": "true",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

const axiosInstance = axios.create({ headers: headers, withCredentials: true, });

export const authenticUser = async (email: string, password: string) => {
  try {
    const {data:response} = await axiosInstance.post(`/backend/auth/login`, {
      email: email,
      password: password,
    });

    return {...response.data, success:true};
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Return the status code if it's an Axios error and response exists
      return { status: error.response.status, message: error.response.data };
    } else {
      console.error("Unexpected error during authentication:", error);
      return { status: 500, message: "Internal Server Error",success:false };
    }
  }
}



export async function getPatients(search: string): Promise<PacienteModel[]> {
  try {
    const token = getToken();

    if (!token) {
      console.error("Token no disponible");
      return [];
    }

    const { data: res } = await axiosInstance.get(`/backend/paciente`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data } = res;

    const pacientes = data.filter(
      (p: PacienteModel) =>
        search.length === 0 ||
        p.apellido.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        p.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        p.dni.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    console.log("Pacientes encontrados:", pacientes);
    return pacientes;
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    return [];
  }
}


export async function getPatient(dni: string): Promise<PacienteModel | null> {
  try {
    const { data: res } = await axiosInstance.get(`/backend/paciente`, {
      headers: headers,
    });

    const { data } = res;

    const paciente = data.filter((p: PacienteModel) => p.dni === dni)[0];

    console.log("EL paciente tiene lo siguiente", paciente);

    return paciente;
  } catch (error) {
    console.error("Error al obtener paciente:", error);
    return null;
  }
}

export async function addPatient(paciente: PacienteModel): Promise<boolean> {
  try {
    const { data: res } = await axiosInstance.post(`/backend/paciente`, paciente);
    return !!res;
  } catch (error) {
    console.error("Error al agregar paciente:", error);
    return false;
  }
}

export async function editPatient(paciente: PacienteModel): Promise<boolean> {
  try {
    const { data: res } = await axiosInstance.put(
      `/backend/paciente/${paciente.dni}`,
      paciente
    );
    return !!res;
  } catch (error) {
    console.error("Error al editar paciente:", error);
    return false;
  }
}

export async function deletePatient(paciente: PacienteModel): Promise<boolean> {
  try {
    const { data: res } = await axiosInstance.delete(
      `/backend/paciente/${paciente.dni}`
    );
    return !!res;
  } catch (error) {
    console.error("Error al eliminar paciente:", error);
    return false;
  }
}

export async function agregarDiagnostico(
  dni: string,
  descripcion: string
): Promise<boolean> {
  try {
    const { data: res } = await axiosInstance.post(
      `/backend/paciente/${dni}/diagnostico`,
      { descripcion }
    );
    return !!res;
  } catch (error) {
    console.error("Error al agregar diagnostico:", error);
    return false;
  }
}

export async function editarDiagnostico(
  id_diagnostico: number,
  dni: string,
  descripcion: string
): Promise<boolean> {
  try {
    const { data: res } = await axiosInstance.put(
      `/backend/paciente/${dni}/diagnostico/${id_diagnostico}`,
      { descripcion }
    );
    return !!res;
  } catch (error) {
    console.error("Error al editar diagnostico:", error);
    return false;
  }
}

export async function eliminarDiagnostico(
  id_diagnostico: number,
  dni: string
): Promise<boolean> {
  try {
    const { data: res } = await axiosInstance.delete(
      `/backend/paciente/${dni}/diagnostico/${id_diagnostico}`
    );
    return !!res;
  } catch (error) {
    console.error("Error al eliminar diagnostico:", error);
    return false;
  }
}

export async function agregarEvolucion(
  dni: string,
  id_diagnostico: number,
  informe: any // eslint-disable-line
): Promise<boolean> {
  try {
    const { data: res } = await axiosInstance.post(
      `/backend/paciente/${dni}/diagnostico/${id_diagnostico}/evolucion`,
      informe
    );
    return !!res;
  } catch (error) {
    console.error("Error al agregar evolucion:", error);
    return false;
  }
}

export const getAllMedications = async (
  pagina: number = 1,
  limite: number = 10
) => {
  try {
    const response = await axiosInstance.get(
      `${config.NEW_HOST}/api/servicio-salud/medicamentos/todos`,
      {
        params: { pagina, limite },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los medicamentos:", error);
    return [];
  }
};

export const searchMedication = async (query: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/servicio-salud/medicamentos`,
      {
        params: { descripcion: query },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching medications:", error);
    return [];
  }
};
