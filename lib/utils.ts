import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const config = {
  HOST:'https://821e-2803-9800-9440-a90a-b0da-acbb-2f75-17b3.ngrok-free.app',
  NEW_HOST: 'https://istp1service.azurewebsites.net'
}