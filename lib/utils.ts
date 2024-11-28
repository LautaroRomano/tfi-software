import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const config = {
  HOST:'https://backendsoft.lunahri.net.ar',
  NEW_HOST: 'https://istp1service.azurewebsites.net'
}