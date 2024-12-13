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