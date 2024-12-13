"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function SelectDiagnostico({ select }: { select: (text:string)=>void }) {
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleSelect = (text:string) => {
    select(text);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>Seleccionar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seleccionar Diagnostico</DialogTitle>
        </DialogHeader>
          <Input
          placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        <div className="flex flex-col gap-1 overflow-y-auto h-96">
          {
            diagnosticoList
            .filter((diagnostico) => diagnostico.toLowerCase().includes(search.toLowerCase()))
            .map((diagnostico, index) => (
              <button key={index} className="text-start bg-[#000] text-white p-2" onClick={()=>handleSelect(diagnostico)}>
                {diagnostico}
              </button>
            ))
          }
        </div>
        <DialogFooter>
          <Button type="submit" onClick={()=>setIsDialogOpen(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
const diagnosticoList = [
  "A00 Cólera",
  "A01 Fiebres tifoidea y paratifoidea",
  "A02 Otras infecciones debidas a Salmonella",
  "A03 Shigelosis",
  "A04 Otras infecciones intestinales bacterianas",
  "A05 Otras intoxicaciones alimentarias bacterianas",
  "A06 Amebiasis",
  "A07 Otras enfermedades intestinales debidas a protozoarios",
  "A08 Infecciones intestinales debidas a virus y otros organismos especificados",
  "A09 Diarrea y gastroenteritis de presunto origen infeccioso",
  "A15 Tuberculosis respiratoria, confirmada bacteriológica e histológicamente",
  "A16 Tuberculosis respiratoria, no confirmada bacteriológica o histológicamente",
  "A17 Tuberculosis del sistema nervioso",
  "A18 Tuberculosis de otros órganos",
  "A19 Tuberculosis miliar",
  "A20 Peste",
  "A21 Tularemia",
  "A22 Carbunco [ántrax]",
  "A23 Brucelosis",
  "A24 Muermo y melioidosis",
  "A25 Fiebres por mordedura de rata",
  "A26 Erisipeloide",
  "A27 Leptospirosis",
  "A28 Otras enfermedades zoonóticas bacterianas, no clasificadas en otra parte",
  "A30 Lepra [enfermedad de Hansen]",
  "A31 Infecciones debidas a otras micobacterias",
  "A32 Listeriosis",
  "A33 Tétanos neonatal",
  "A34 Tétanos obstétrico",
  "A35 Otros tétanos",
  "A36 Difteria",
  "A37 Tos ferina [tos convulsiva]",
  "A38 Escarlatina",
  "A39 Infección meningocócica",
  "A40 Septicemia estreptocócica",
  "A41 Otras septicemias",
  "A42 Actinomicosis",
  "A43 Nocardiosis",
  "A44 Bartonelosis",
  "A46 Erisipela",
  "A48 Otras enfermedades bacterianas, no clasificadas en otra parte",
  "A49 Infección bacteriana de sitio no especificado",
  "A50 Sífilis congénita",
  "A51 Sífilis precoz",
  "A52 Sífilis tardía",
  "A53 Otras sífilis y las no especificadas",
  "A54 Infección gonocócica",
  "A55 Linfogranuloma (venéreo) por clamidias",
  "A56 Otras enfermedades de transmisión sexual debidas a clamidias",
  "A57 Chancro blando",
  "A58 Granuloma inguinal",
  "A59 Tricomoniasis",
  "A60 Infección anogenital debida a virus del herpes (herpes simple)",
  "A63 Otras enfermedades de transmisión predominantemente sexual, no clasificadas en otra parte",
  "A64 Enfermedad de transmisión sexual no especificada",
  "A65 Sífilis no venérea",
  "A66 Frambesia",
  "A67 Pinta [carate]",
  "A68 Fiebres recurrentes",
  "A69 Otras infecciones causadas por espiroquetas",
  "A70 Infección debida a Chlamydia psittaci",
  "A71 Tracoma",
  "A74 Otras enfermedades causadas por clamidias",
  "A75 Tifus",
  "A77 Fiebre maculosa (rickettsiosis transmitida por garrapatas)",
  "A78 Fiebre Q",
  "A79 Otras rickettsiosis",
  "A80 Poliomielitis aguda",
  "A81 Infecciones del sistema nervioso central por virus lento",
  "A82 Rabia",
  "A83 Encefalitis viral transmitida por mosquitos",
  "A84 Encefalitis viral transmitida por garrapatas",
  "A85 Otras encefalitis virales, no clasificadas en otra parte",
  "A86 Encefalitis viral, no especificada",
  "A87 Meningitis viral",
  "A88 Otras infecciones virales del sistema nervioso central, no clasificadas en otra parte",
  "A89 Infección viral del sistema nervioso central, no especificada",
  "A90 Fiebre del dengue [dengue clásico]",
  "A91 Fiebre del dengue hemorrágico",
  "A92 Otras fiebres virales transmitidas por mosquitos",
  "A93 Otras fiebres virales transmitidas por artrópodos, no clasificadas en otra parte",
  "A94 Fiebre viral transmitida por artrópodos, no especificada",
  "A95 Fiebre amarilla",
  "A96 Fiebre hemorrágica por arenavirus",
  "A98 Otras fiebres virales hemorrágicas, no clasificadas en otra parte",
  "A99 Fiebre viral hemorrágica, no especificada",
  "B00 Infecciones herpéticas [herpes simple]",
  "B01 Varicela",
  "B02 Herpes zóster",
  "B03 Viruela",
  "B04 Viruela de los monos",
  "B05 Sarampión",
  "B06 Rubéola [sarampión alemán]",
  "B07 Verrugas víricas",
  "B08 Otras infecciones víricas caracterizadas por lesiones de la piel y de las membranas mucosas",
  "B09 Infección viral no especificada, caracterizada por lesiones de la piel y de las membranas mucosas",
  "B15 Hepatitis aguda tipo A",
  "B16 Hepatitis aguda tipo B",
  "B17 Otras hepatitis virales agudas",
  "B18 Hepatitis viral crónica",
];