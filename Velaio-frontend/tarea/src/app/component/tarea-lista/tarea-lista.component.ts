import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { Task } from '../interface/task';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tarea-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarea-lista.component.html',
  styleUrl: './tarea-lista.component.css'
})
export class TareaListaComponent implements OnInit {  
  
    public tareas: Task[] = [];
    public filtroCompletadas: boolean = false;
    public filtroPendiente: boolean = false;
    public filtroTodos: boolean = false;
    public estadoSeleccionado: string = 'todas';
    
  
    constructor(
      public servicio: ServiceService, 
      private router: Router,     
    ) {}
  
    ngOnInit(): void {
      this.getTareas();
    }

    obtenerTareas(): void {
      this.servicio.getTareas().subscribe((tareas: Task[]) => {
        this.tareas = tareas;
      });
    }
  
    getTareas(): void {
      this.servicio.getTareas().subscribe(data => {
        this.tareas = data;
      });
    }
  
    eliminarTarea(id: number): void {
      this.servicio.eliminarTarea(id).subscribe(() => {   
        this.getTareas(); // Actualiza la lista después de eliminar  
      });
      this.router.navigate(['/tarea-listas']);
      alert("eliminado")      
    }
  
    toggleFiltro(): void {
      this.filtroCompletadas = !this.filtroCompletadas;
    }

    tareasFiltradas(): any[]{
      return this.tareas.filter(tarea => {
        const completada = tarea.completada;
        const esCompletada = this.filtroCompletadas && completada;
        const esPendiente = this.filtroPendiente && !completada;
        return (this.filtroTodos || esCompletada || esPendiente);
      });
    }
  
    filtrarTareas(): Task[] {
      return this.tareas.filter(tarea => tarea.completada === this.filtroCompletadas);
    }

    editarTarea(id: number): void {
      this.router.navigate(['/tarea-detalle', id])
    }

    toggleEstado(tarea: Task): void {      
      tarea.completada = !tarea.completada;      
      this.servicio.actualizarTarea(tarea.id, tarea).subscribe(() => {});
    }
} 


