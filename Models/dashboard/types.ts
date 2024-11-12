export interface PersonaModel {
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: Date;
  email: string;
  telefono: number;
  direccion: string;
}

export interface PacienteModel extends PersonaModel {
  id_paciente?: number;
  historiaClinica: HistoriaClinicaModel;
}

export interface HistoriaClinicaModel {
  id_historia_clinica: number;
  diagnosticos: DiagnosticoModel[];
}

export interface DiagnosticoModel {
  id: number;
  descripcion: string;
  evoluciones: EvolucionModel[];
}

export interface EvolucionModel {
  id_evolucion: number;
  fecha: Date;
  informe: string;
  medico: MedicoModel;
  recetaDigital?: RecetaDigitalModel;
  pedidoLaboratorio?: PedidoLaboratorioModel;
}

export interface RecetaDigitalModel {
    id_receta_digital: number;
    fecha: Date;
    descripcion: string;
    recetaDigitaldetalle: RecetaDigitalDetalleModel[];
  }
  
  export interface RecetaDigitalDetalleModel {
    id_recetaDigital_detalle: number;
    medicamento: MedicamentoModel;
    cantidad: number | null;
  }
  
  export interface PedidoLaboratorioModel {
    id_pedido_laboratorio: number;
    descripcion: string;
  }

export interface MedicamentoModel {
  id_medicamento?: number;
  nombreComercial: string;
  nombreGenerico: string;
  presentacion: string;
}

export interface MedicoModel extends PersonaModel {
  id_medico?: number;
  matricula: string;
  especialidad: string;
}

