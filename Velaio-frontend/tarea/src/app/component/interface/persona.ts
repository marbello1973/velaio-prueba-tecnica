export interface Persona {
    id: number;
    nombre: string;
    edad: number;
    habilidades: Habilidad[];
  }
  
  export interface Habilidad {
    id: number;
    nombreHabilidad: string;
  }
  