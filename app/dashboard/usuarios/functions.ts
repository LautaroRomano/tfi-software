import { Patient, User } from "@/Models/dashboard/types";

export async function getPatients(search: string): Promise<Patient[]> {
  const res =
    search.length > 0
      ? testPatients.filter((data) =>
          data.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : testPatients;
  return res;
}

export async function getUsers(search: string): Promise<User[]> {
  const res =
    search.length > 0
      ? testUsers.filter((data) =>
          data.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : testUsers;
  return res;
}

const testPatients = [
  {
    id: "a4b3c9d2",
    name: "Carlos Aguilar",
    cuil: "20-54821984-3",
    phone: "3865172394",
    birthDay: "14-03-1995",
    email: "carlosaguilar321@gmail.com",
  },
  {
    id: "f6d8e7a1",
    name: "Emmanuel Arnedo",
    cuil: "20-32987465-1",
    phone: "3865884761",
    birthDay: "22-11-1988",
    email: "emmanuelarnedo495@gmail.com",
  },
  {
    id: "b9f3d6e4",
    name: "Julian Toledo",
    cuil: "20-78264109-5",
    phone: "3865598743",
    birthDay: "08-06-1999",
    email: "juliantoledo648@gmail.com",
  },
  {
    id: "e2d5a9c8",
    name: "Rocio Vera Lopez",
    cuil: "20-43759184-8",
    phone: "3865772348",
    birthDay: "19-02-1993",
    email: "rocioveralop581@gmail.com",
  },
  {
    id: "d5a1b8f4",
    name: "Valentina Martinez",
    cuil: "20-62379148-6",
    phone: "3865169842",
    birthDay: "12-09-2000",
    email: "valentinamartinez724@gmail.com",
  },
  {
    id: "c3e8f7a2",
    name: "Marcos Lopez",
    cuil: "20-38721948-9",
    phone: "3865789321",
    birthDay: "04-07-1987",
    email: "marcoslopez387@gmail.com",
  },
  {
    id: "f8b4c6d3",
    name: "Luciana Diaz",
    cuil: "20-54321879-2",
    phone: "3865156823",
    birthDay: "15-01-1991",
    email: "lucianadiaz293@gmail.com",
  },
  {
    id: "a7d9e4b5",
    name: "Santiago Pereyra",
    cuil: "20-82947365-4",
    phone: "3865912837",
    birthDay: "25-10-1996",
    email: "santiagopereyra718@gmail.com",
  },
  {
    id: "e6c3f1d8",
    name: "Ana Gutierrez",
    cuil: "20-21378496-7",
    phone: "3865589234",
    birthDay: "30-05-1990",
    email: "anagutierrez832@gmail.com",
  },
  {
    id: "d1a4b9f2",
    name: "Joaquin Paz",
    cuil: "20-41758392-6",
    phone: "3865732184",
    birthDay: "18-08-1998",
    email: "joaquinpaz159@gmail.com",
  },
];

const testUsers = [
  {
    id: "a4b3c9d2",
    name: "Carlos Aguilar",
    cuil: "20-54821984-3",
    phone: "3865172394",
    birthDay: "14-03-1995",
    email: "carlosaguilar321@gmail.com",
    role: "admin",
    password:'########'
  },
  {
    id: "f6d8e7a1",
    name: "Emmanuel Arnedo",
    cuil: "20-32987465-1",
    phone: "3865884761",
    birthDay: "22-11-1988",
    email: "emmanuelarnedo495@gmail.com",
    role: "admin",
    password:'########'
  },
  {
    id: "b9f3d6e4",
    name: "Julian Toledo",
    cuil: "20-78264109-5",
    phone: "3865598743",
    birthDay: "08-06-1999",
    email: "juliantoledo648@gmail.com",
    role: "admin",
    password:'########'
  },
  {
    id: "e2d5a9c8",
    name: "Rocio Vera Lopez",
    cuil: "20-43759184-8",
    phone: "3865772348",
    birthDay: "19-02-1993",
    email: "rocioveralop581@gmail.com",
    role: "admin",
    password:'########'
  },
  {
    id: "d5a1b8f4",
    name: "Valentina Martinez",
    cuil: "20-62379148-6",
    phone: "3865169842",
    birthDay: "12-09-2000",
    email: "valentinamartinez724@gmail.com",
    role: "admin",
    password:'########'
  },
  {
    id: "c3e8f7a2",
    name: "Marcos Lopez",
    cuil: "20-38721948-9",
    phone: "3865789321",
    birthDay: "04-07-1987",
    email: "marcoslopez387@gmail.com",
    role: "admin",
    password:'########'
  },
  {
    id: "f8b4c6d3",
    name: "Luciana Diaz",
    cuil: "20-54321879-2",
    phone: "3865156823",
    birthDay: "15-01-1991",
    email: "lucianadiaz293@gmail.com",
    role: "admin",
    password:'########'
  },
  {
    id: "a7d9e4b5",
    name: "Santiago Pereyra",
    cuil: "20-82947365-4",
    phone: "3865912837",
    birthDay: "25-10-1996",
    email: "santiagopereyra718@gmail.com",
    role: "admin",
    password:'########'
  },
  {
    id: "e6c3f1d8",
    name: "Ana Gutierrez",
    cuil: "20-21378496-7",
    phone: "3865589234",
    birthDay: "30-05-1990",
    email: "anagutierrez832@gmail.com",
    role: "admin",
    password:'########'
  },
  {
    id: "d1a4b9f2",
    name: "Joaquin Paz",
    cuil: "20-41758392-6",
    phone: "3865732184",
    birthDay: "18-08-1998",
    email: "joaquinpaz159@gmail.com",
    role: "admin",
    password:'########'
  },
];
