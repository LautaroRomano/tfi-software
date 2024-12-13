"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { getPlantillas, storePlantilla } from "@/lib/utils";
import { useEffect, useState } from "react";

export function SelectPlantilla({ select }: { select: (text:string)=>void }) {
  const [plantillas, setPlantillas] = useState<{ id: string; text: string }[]>([]);
  const [indexPlantilla, setIndexPlantilla] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChangePlantilla = (text: string, id: string) => {
    const newPlantillas = [...plantillas];
    const generateId = () => Math.random().toString(36).substring(2, 15);
    newPlantillas[indexPlantilla] = { text, id: id || generateId() };
    setPlantillas(newPlantillas);
  };

  const next = () => {
    if (indexPlantilla === plantillas.length) return;
    setIndexPlantilla((prev) => prev + 1);
  };

  const prev = () => {
    if (indexPlantilla === 0) return;
    setIndexPlantilla((prev) => prev - 1);
  };

  const handleSavePlantilla = () => {
    const res = storePlantilla(plantillas);
    if (Array.isArray(res)) setPlantillas(res);
  };

  const handleSelect = () => {
    select(plantillas[indexPlantilla]?.text);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const plantillas = getPlantillas();
    if (Array.isArray(plantillas)) {
      setPlantillas(plantillas);
    }
  }, []);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>Seleccionar plantilla</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seleccionar Plantilla</DialogTitle>
          <DialogDescription>
            Seleccione una plantilla de pedido de laboratorio.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Textarea
          className="min-h-52"
            value={plantillas[indexPlantilla]?.text || ''}
            onChange={(e) => handleChangePlantilla(e.target.value, plantillas[indexPlantilla]?.id || '')}
            placeholder="Ingrese una plantilla de pedido de laboratorio"
          />
          <div className="flex gap-1 justify-evenly mt-1">
            <Button onClick={prev} disabled={indexPlantilla <= 0}>
              Anterior
            </Button>
            <Button
              onClick={next}
              disabled={indexPlantilla === plantillas.length}
            >
              Siguiente
            </Button>
            <Button onClick={handleSavePlantilla}>Guardar</Button>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSelect}>
            Seleccionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
