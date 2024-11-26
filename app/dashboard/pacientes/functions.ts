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
    console.log(paciente);

    return paciente;
  } catch (error) {
    console.log("🚀 ~ getPatients ~ error:", error);
    return null;
  }
}

export async function addPatient(paciente: PacienteModel): Promise<boolean> {
  try {
    const { data: res } = await axios.post(`${config.HOST}/paciente`, paciente);
    console.log("🚀 ~ createPatient ~ res:", res);
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
  informe: string
): Promise<boolean> {
  try {
    const { data: res } = await axios.post(
      `${config.HOST}/paciente/${dni}/diagnostico/${id_diagnostico}/evolucion`,
      { informe }
    );
    return !!res;
  } catch (error) {
    console.log("🚀 ~ getPatients ~ error:", error);
    return false;
  }
}
