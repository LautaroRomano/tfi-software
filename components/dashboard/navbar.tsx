"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export default function Navbar({ title = "" }) {
  const [isOpen, setIsOpen] = useState(false);


  // Función para manejar la apertura/cierre del menú
  const toggleDropdown = () => {
    console.log("onclick");
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex w-full top-0 left-0 h-16 px-10 items-center justify-between ">
      <div className="flex">
        <h1 className="text-white text-2xl font-semibold">{title}</h1>
      </div>
      <div className="flex">
        {/* DropdownMenu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <Avatar onClick={toggleDropdown}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>

          {isOpen && (
            <DropdownMenuContent
              className="w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-2 mt-2"
            >
              <DropdownMenuLabel className="text-gray-700 font-medium text-center">Cerrar Sesión</DropdownMenuLabel>
              <div className="flex flex-col space-y-1 mt-2">
                <button className="text-red-500 hover:text-red-700 py-1 px-4 text-sm rounded-md transition duration-200">
                  Confirmar
                </button>
                <button className="text-gray-500 hover:text-gray-700 py-1 px-4 text-sm rounded-md transition duration-200">
                  Cancelar
                </button>
              </div>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    </div>
  );
}
