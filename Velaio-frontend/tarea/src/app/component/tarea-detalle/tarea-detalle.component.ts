import { Component, OnInit } from '@angular/core';
import { Task } from '../interface/task';
import { Persona } from '../interface/persona';
import { ServiceService } from '../../service/service.service';
import { PersonaServiceService } from '../../service/persona-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-tarea-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarea-detalle.component.html',
  styleUrl: './tarea-detalle.component.css'
})
export class TareaDetalleComponent implements OnInit {

  tareaId!: number
  personas: Persona[] = [];
  habilidades: string[] = []; 
  personaSeleccionada: Persona | null = null;
  
  tarea: Task = {
    id: 0,
    nombreTareas: '', // Corregido a nombreTarea
    fechaLimite: '',
    personas: [
      {
        id: 0,
        nombre: '',
        edad: 0, // Asumiendo que edad es un número
        habilidades: []
      },
    ], 
    completada: false,
  };

  constructor(
    private servicio: ServiceService,
    private personaService: PersonaServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.tareaId = p['id'];
      this.cargarTarea(this.tareaId);
      this.cargarPersonas();
      this.asignarPersona()
    })    
  }

  cargarTarea(id: number): void {
    this.servicio.obtenerTareaPorId(id).subscribe(tarea => {
      this.tarea = tarea;
      if(!this.tarea.personas){
        this.tarea.personas = [];
      }
      const personaConHabilidades = tarea.personas.find((p) => p.habilidades && p.habilidades.length > 0);
      this.habilidades = personaConHabilidades ? personaConHabilidades.habilidades.map(h => h.nombreHabilidad) : [];
    }, error => {
      console.error('Error al cargar la tarea: ', error);
    });
  } 

  cargarPersonas(): void {
    this.personaService.obtenerPersonas().subscribe(persona => {      
      this.personas = persona;
    });
  }

  asignarPersona(): void { 

    if (this.personaSeleccionada) {   
      const personaYaAsignada = this.tarea.personas.some(p => p.id === this.personaSeleccionada?.id)      
      if(personaYaAsignada) {
        alert('la pesona ya esta asignada...!')
      }else{
        this.tarea.personas.push(this.personaSeleccionada);
        this.personaSeleccionada = null;      
      } 
    }
  }

  /* asignarPersona(): void {
    if (this.personaSeleccionada) {      
      this.tarea.personas.push(this.personaSeleccionada);
      this.personaSeleccionada = null;      
    }
  }
 */
  eliminarPersona(persona: Persona): void {
    this.tarea.personas = this.tarea.personas.filter(p => p.id !== persona.id);
    
  }

  
  eliminarHabilidad(habilidad: string): void {
    this.habilidades = this.habilidades.filter(h => h !== habilidad);
    
  }

  navegarALista(): void {
    this.router.navigate(['/tarea-listas']);
  }

  guardarCambios(): void{
    this.servicio.actualizarTarea(this.tareaId, this.tarea).subscribe(r => {     
      this.router.navigate(['/tarea-listas'])
    }, error => {
      console.error("Error al guardar");
    })
  }

  agregarHabilidad(habilidad: string): void {
    if (habilidad) {
      this.habilidades.push(habilidad);
    }
  }

  toggleEstado(): void {
    this.tarea.completada = !this.tarea.completada;
  }
}





