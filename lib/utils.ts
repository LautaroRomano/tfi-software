import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const config = {
  HOST: process.env.NEXT_PUBLIC_HOST || 'http://localhost:8080',
  NEW_HOST: process.env.NEXT_PUBLIC_NEW_HOST ||'https://istp1service.azurewebsites.net'
}

export const storeToken = async (token: string,) => {
  try {
    localStorage.setItem("TOKEN", token);
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