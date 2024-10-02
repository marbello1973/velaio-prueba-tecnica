import { Persona } from "./persona"; 

export interface Task { 
  id: number;
  nombreTareas: string;
  fechaLimite: string;
  personas: Persona[];
  completada: boolean;
}
