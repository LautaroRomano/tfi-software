import { config, getToken } from "@/lib/utils";
import { PacienteModel } from "@/Models/dashboard/types";
import axios from "axios";

const headers = {
  "ngrok-skip-browser-warning": "true",
  "Content-Type": "application/json",
  "strict-origin-when-cross-origin": "true",
};



const axiosInstance = axios.create({ headers: headers, withCredentials: true, });

export const authenticUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(`${config.HOST}/auth/login`, {
      email: email,
      password: password,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Return the status code if it's an Axios error and response exists
      return { status: error.response.status, message: error.response.data };
    } else {
      console.error("Unexpected error during authentication:", error);
      return { status: 500, message: "Internal Server Error" };
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

    const { data: res } = await axios.get("http://181.84.146.35:8080/paciente", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    const { data: res } = await axiosInstance.get(`${config.HOST}/paciente`, {
      headers: headers,
    });

    const { data } = res;

    const paciente = data.filter((p: PacienteModel) => p.dni === dni)[0];

    console.log("EL paciente tiene lo siguiente", paciente);

    return paciente;
  } catch (error) {
    return null;
  }
}

export async function addPatient(paciente: PacienteModel): Promise<boolean> {
  try {
    const { data: res } = await axios.post(`${config.HOST}/paciente`, paciente);
    return !!res;
  } catch (error) {
    return false;
  }
}

export async function editPatient(paciente: PacienteModel): Promise<boolean> {
  try {
    const { data: res } = await axios.put(
      `${config.HOST}/paciente/${paciente.dni}`,
      paciente
    );
    return !!res;
  } catch (error) {
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
    return false;
  }
}

export async function agregarEvolucion(
  dni: string,
  id_diagnostico: number,
  informe: any
): Promise<boolean> {
  console.log("🚀 ~ informe:", informe)
  try {
    const { data: res } = await axiosInstance.post(
      `${config.HOST}/paciente/${dni}/diagnostico/${id_diagnostico}/evolucion`,
      informe
    );
    return !!res;
  } catch (error) {
    return false;
  }
}

export const getAllMedications = async (
  pagina: number = 1,
  limite: number = 10
) => {
  try {
    const response = await axios.get(
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

export const fetchMedicamentos = async (desc: string, callback: Function) => {
  try {
    const response = await axiosInstance.get(
      `${config.NEW_HOST}/api/servicio-salud/medicamentos?descripcion=${desc}`
    );
    callback(response.data);
  } catch (error) {
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
