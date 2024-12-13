import React, { useState, useEffect } from 'react';
import {EvolucionModel, MedicamentModel, PedidoLaboratorioModel, RecetaDigitalModel} from "@/Models/dashboard/types";
import {agregarEvolucion, fetchMedicamentos, searchMedication} from "@/app/dashboard/pacientes/functions";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { format } from 'date-fns';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from '@/components/ui/textarea';
import { SelectPlantilla } from './select-plantilla';

interface PropsType {
  isOpen: boolean;
  dni: string;
  id_diagnostico: number;
  reload: Function;
  close: () => void;
}

const createEvolucionData: EvolucionModel | null = {
  id_evolucion: 0,
  informe: '',
  fecha: new Date(),
  medico: {
    id_medico: 1,
    apellido: 'Romano',
    nombre: 'Lautaro',
    email: 'lautaro@gmail.com',
    direccion: 'Monteros',
    dni: '123456',
    especialidad: 'Pediatra',
    fechaNacimiento: new Date(),
    matricula: '999555444',
    telefono: "123456",
  },
};

export default function CreateEvolucion({
                                          isOpen,
                                          dni,
                                          id_diagnostico,
                                          reload,
                                          close,
                                        }: PropsType) {
  const [data, setData] = useState<EvolucionModel | null>(createEvolucionData);
  const [medicamentos, setMedicamentos] = useState<MedicamentModel[]>([]);
  const [descMedicamentoNuevo, setDescMedicamentoNuevo] = useState<string>('');
  const [medicamentoNuevo, setMedicamentoNuevo] = useState<{codigo: number,descripcion: string,formato: string,cantidad:number|null}|null>(null);
  const [cantidadNuevo, setCantidadNuevo] = useState<number>(1);
  const [pedidoLaboratorio, setPedidoLaboratorio] = useState<PedidoLaboratorioModel>({descripcion: ''});
  const [selectedTab, setSelectedTab] = useState<string>('none');
  const [listFetchMedicamentos,setListFetchMedicamentos] = useState<{codigo: number,descripcion: string,formato: string}[]>([]);

  useEffect(() => {
    const getMedicamentos = async () => {
      const medicamentos = await searchMedication(descMedicamentoNuevo);
      setListFetchMedicamentos(medicamentos);
    }
    if (descMedicamentoNuevo.length > 2) getMedicamentos();
    else {
      setListFetchMedicamentos([]);
      setMedicamentoNuevo(null);
    }
  }, [descMedicamentoNuevo]);

  const handleChangeData = (name: keyof EvolucionModel, value: string) => {
    setData((prev) => (prev ? { ...prev, [name]: value } : null));
  };


  const handleChangeDescription = (name: keyof RecetaDigitalModel, value: string) => {
    setData((prev) => {
      if (prev) {
        const recetaDigital = prev.receta || { fecha: format(new Date(), 'yyyy-MM-dd HH:mm:ss'), descripcion: '', medicamentos: [] };
        return { ...prev, receta: { ...recetaDigital, [name]: value } };
      }
      return null;
    });
  };


  const handleAddMedication = () => {
    if(!medicamentoNuevo) return alert('Debe seleccionar un medicamento');
    if(cantidadNuevo <= 0) return alert('La cantidad debe ser mayor a 0');
    setListFetchMedicamentos([]);
    setMedicamentoNuevo(null);
    setMedicamentos((prev) => [
      ...prev,
      { nombreComercial: medicamentoNuevo.descripcion,nombreGenerico: medicamentoNuevo.descripcion, cantidad: cantidadNuevo,presentacion:medicamentoNuevo.formato },
    ]);
    setDescMedicamentoNuevo('');
    setCantidadNuevo(1);
  };

  const handleRemoveMedication = (index: number) => {
    setMedicamentos((prev) => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = async () => {
    if (!data?.informe || data.informe.length === 0) {
      return alert('Debes agregar una descripción!');
    }

    const aditionalData: any = {};
    
    switch (selectedTab) {
      case 'receta':
        aditionalData['receta'] = {
          fecha:  format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          descripcion: data.receta?.descripcion || '',
          medicamentos: medicamentos,
        }
        break;
      case 'laboratorio':
        aditionalData['pedidoLaboratorio'] = pedidoLaboratorio;
        break;
      case 'none':
        break;
      default:
        break;
    }

    if(selectedTab==='receta' && data.receta?.descripcion && data.receta?.descripcion.length > 0){
      
    }else if(selectedTab==='laboratorio' && pedidoLaboratorio.descripcion && pedidoLaboratorio.descripcion.length > 0){
      
    }
    
    const evolucionData: EvolucionModel = {
      ...data,
      informe: data.informe,  // Suponiendo que 'data.informe' contiene la descripción
      ...aditionalData
    };

    const res = await agregarEvolucion(dni, id_diagnostico, evolucionData);

    if (!res) return alert('Ocurrió un error!');
    reload();
  };


  useEffect(() => {
    if (isOpen) {
      setData(createEvolucionData);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
      <div className="flex fixed top-0 left-0 w-screen h-screen justify-center items-center z-50 bg-[#0005]">
        <div className="flex flex-col gap-4 p-6 border border-gray-300 rounded-lg shadow-md bg-white max-w-4xl">
          <h2 className="font-semibold mb-4 dashboard-title">Crear Nueva Evolución</h2>
          <div className="flex gap-8 m-2">
            <div className=" w-full">
              <Label htmlFor="nombre" className="font-semibold text-md">
                Informe
              </Label>
              <Input
                  className="bg-gray-200 w-full"
                  id="informe"
                  name="informe"
                  value={data?.informe || ''}
                  onChange={({ target }) => handleChangeData('informe', target.value)}
                  placeholder="Ingrese un informe"
              />
            </div>
          </div>
          <Tabs defaultValue="none" className="w-[600px] h-[300px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="none" onClick={()=>setSelectedTab('none')}>Vacio</TabsTrigger>
              <TabsTrigger value="receta" onClick={()=>setSelectedTab('receta')}>Receta</TabsTrigger>
              <TabsTrigger value="laboratorio" onClick={()=>setSelectedTab('laboratorio')}>Pedido laboratorio</TabsTrigger>
              <TabsContent value="none">
                <div className="w-[600px] m-2">
                    <div className="">
                      <Label className="font-semibold text-md">
                        Sin receta ni pedido de laboratorio
                      </Label>
                    </div>
                </div>
              </TabsContent>
              <TabsContent value="receta">
                <div className="w-[600px] m-2">
                  <div className="">
                    <Label htmlFor="nombre" className="font-semibold text-md">
                      Receta
                    </Label>
                    <Input
                        className="bg-gray-200"
                        id="receta"
                        name="receta"
                        value={data?.receta?.descripcion || ''}
                        onChange={({ target }) => handleChangeDescription('descripcion', target.value)}
                        placeholder="Ingrese una descripción de la receta"
                    />
                  </div>
                  {/* Campo para ingresar un medicamento nuevo */}
                  <div className="mt-4">
                    <Label htmlFor="descMedicamentoNuevo" className="font-semibold text-md">
                      Medicamento
                    </Label>
                    <div className="flex items-center relative">
                      <Input
                          className="bg-gray-200 flex-1"
                          id="descMedicamentoNuevo"
                          name="descMedicamentoNuevo"
                          value={descMedicamentoNuevo}
                          onChange={({ target }) => setDescMedicamentoNuevo(target.value)}
                          placeholder="Ingrese el nombre del medicamento"
                      />
                      <div className="flex flex-col absolute top-12 left-0 gap-2 h-auto max-h-52 overflow-y-auto">
                        {!medicamentoNuevo && listFetchMedicamentos.map((medicamento, index) => (
                            <Button
                                key={index}
                                className="px-4 py-2 rounded text-sm"
                                onClick={() => {
                                  setMedicamentoNuevo({...medicamento,cantidad:0});
                                  setDescMedicamentoNuevo(`${medicamento.descripcion}`);
                                }}
                            >
                              <p className='text-start w-full'>
                              {medicamento.codigo} - {medicamento.descripcion} - {medicamento.formato}
                              </p>
                            </Button>
                        ))}
                      </div>
                      <Input
                          className="bg-gray-200 flex-1 ml-2"
                          id="cantidadNuevo"
                          name="cantidadNuevo"
                          type="number"
                          value={cantidadNuevo}
                          onChange={({ target }) => setCantidadNuevo(Number(target.value))}
                          min="1"
                          placeholder="Cantidad"
                      />
                      <button
                          className="bg-blue-500 text-white ml-2 px-4 py-2 rounded disabled:bg-gray-500"
                          onClick={handleAddMedication}
                          disabled={medicamentos.length >=2}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                  {/* Lista de medicamentos agregados con cantidad */}
                  {medicamentos.length > 0 && (
                      <div className="mt-4">
                        <Label className="font-semibold text-md">Medicamentos agregados</Label>
                        <ul className="list-disc pl-5">
                          {medicamentos.map((medicamento, index) => (
                              <li key={index} className="flex justify-between items-center">
                          <span>
                            {medicamento.nombreComercial} - {medicamento.cantidad} unidades
                          </span>
                                <button
                                    className="text-red-600"
                                    onClick={() => handleRemoveMedication(index)}
                                >
                                  Eliminar
                                </button>
                              </li>
                          ))}
                        </ul>
                      </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="laboratorio">
                  <div className="w-[600px] m-2">
                    <div className="">
                      <Label htmlFor="nombre" className="font-semibold text-md">
                        Pedido de laboratorio
                      </Label>
                      <div className="flex flex-col gap-2">
                        <Textarea
                          className="bg-gray-200 h-52"
                          id="descripcion"
                          name="descripcion"
                          value={pedidoLaboratorio?.descripcion || ''}
                          onChange={({ target }) => setPedidoLaboratorio({descripcion: target.value})}
                          placeholder="Ingrese una descripción"
                        />
                        <div className="flex w-full justify-end">
                        <SelectPlantilla select={(descripcion:string) => setPedidoLaboratorio({descripcion})}/>
                        </div>
                      </div>
                    </div>
                  </div>
              </TabsContent>
      </TabsList>
          </Tabs>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={close}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>Guardar</Button>
          </div>
        </div>
      </div>
  );
}