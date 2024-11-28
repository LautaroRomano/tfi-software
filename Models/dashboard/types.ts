export interface PersonaModel {
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: Date;
  email: string;
  telefono: string;
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
  id_diagnostico: number;
  descripcion: string;
  evoluciones: EvolucionModel[];
}

export interface EvolucionModel {
  id_evolucion: number;
  fecha: Date;
  informe: string;
  medico: MedicoModel;
  receta?: RecetaDigitalModel;
  pedidoLaboratorio?: PedidoLaboratorioModel;
}

export interface RecetaDigitalModel {
    fecha: Date;
    descripcion: string;
    medicamentos: RecetaDigitalDetalleModel[];
  }
  
  export interface RecetaDigitalDetalleModel {
    medicamento: MedicamentoModel;
    nombreComercial: string;
    nombreGenerico: string;
    cantidad: number | null;
    presentacion: string;
  }
  
  export interface PedidoLaboratorioModel {
    id_pedido_laboratorio: number;
    descripcion: string;
  }

export interface MedicamentoModel {
  id_medicamento?: number;
  nombreComercial: string; //luego sacar
  nombreGenerico: string; //luego scar
  presentacion: string;
}

export interface MedicamentModel{
    code: string,
    description: string,
    format: string
}

export interface MedicoModel extends PersonaModel {
  id_medico?: number;
  matricula: string;
  especialidad: string;
}

