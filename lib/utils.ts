'use client'
/* eslint-disable */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const config = {
  HOST: process.env.NEXT_PUBLIC_HOST || 'http://localhost:8080',
  NEW_HOST: process.env.NEXT_PUBLIC_NEW_HOST ||'https://istp1service.azurewebsites.net'
}

export const storeToken = async (token: string,user:any) => {
  try {
    localStorage.setItem("TOKEN", token);
    localStorage.setItem("USER", JSON.stringify(user));
  } catch (error) {
    console.error("Error storing tokens", error);
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem("TOKEN");
  } catch (error) {
    console.error("Error retrieving access token from localStorage", error);
    return null;
  }
};

export const getUserLoggued = () => {
  try {
    const data = localStorage.getItem("USER");
    if(data){
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error("Error retrieving access token from localStorage", error);
    return null;
  }
};

export const storePlantilla = async (platillas: any) => {
  try {
    localStorage.setItem("PLANTILLAS", JSON.stringify(platillas));
    return getPlantillas();
  } catch (error) {
    console.error("Error storing PLANTILLAS", error);
  }
};

export const getPlantillas = () => {
  try {
    const data = localStorage.getItem("PLANTILLAS");
    if (data) {
      return JSON.parse(data);
    } else {
      const examplePlantillas = [
        { 
          id: '1', 
          text: 'Fecha: 13/12/2024\nPaciente: Juan Pérez\nSolicito: Hemograma completo con recuento diferencial, velocidad de sedimentación globular y proteína C reactiva. Indicado para evaluar posibles procesos infecciosos o inflamatorios.' 
        },
        { 
          id: '2', 
          text: 'Fecha: 13/12/2024\nPaciente: María González\nSolicito: Perfil lipídico que incluya colesterol total, HDL, LDL y triglicéridos. También se requiere glucosa en ayunas y hemoglobina glucosilada para control metabólico.' 
        },
      ];      
      localStorage.setItem("PLANTILLAS", JSON.stringify(examplePlantillas));
      return examplePlantillas;
    }
  } catch (error) {
    console.error("Error retrieving access token from localStorage", error);
    return null;
  }
};