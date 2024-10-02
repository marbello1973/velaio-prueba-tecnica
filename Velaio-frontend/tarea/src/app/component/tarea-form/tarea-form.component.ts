import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { Task } from '../interface/task'
import { ServiceService } from '../../service/service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarea-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tarea-form.component.html',
  styleUrl: './tarea-form.component.css'
})
export class TareaFormComponent implements OnInit {

  public tareaForm: FormGroup;
  tareas: Task[] = [];  
  
  nuevaTarea: Task = {
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
    private fb: FormBuilder,
    private router: Router,
    public servicio: ServiceService
  ) {     
    this.tareaForm = this.initTareaForm();
  }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  initTareaForm(): FormGroup {
    return this.fb.group({
      nombreTareas: ['', [Validators.required, Validators.minLength(5)]],
      fechaLimite: ['', [Validators.required]],
      persona: this.fb.group({
        nombre: ['', [Validators.required]],
        edad: [null, [Validators.required, Validators.min(18), Validators.max(99)]],
        habilidades: this.fb.array([])
      }),
      completada: [false] // Valor predeterminado
    });
  }   

  obtenerTareas(): void {
    this.servicio.getTareas().subscribe({
      next: (data) => {
        this.tareas = data;       
      },
      error: (err) => {
        console.error('Error al obtener tareas:', err); 
      }
    });
  }

  agregarTarea(): void {    
    if(this.tareaForm.valid){
      const tarea: Task = this.tareaForm.value;      
      this.servicio.agregarTarea(tarea).subscribe((r) => {
        console.log("Tarea agregada", r);
        this.router.navigate(['/tarea-listas']);
      }, 
      (error) => {
        console.error("Error al agregar tarea", error);
      });
    }

  }

  getHabilidades(): FormArray {
    return this.tareaForm.get('persona.habilidades') as FormArray;
  }
  

  initFormHabilidad(): FormGroup {
    return this.fb.group({
      nombreHabilidad: ['', [Validators.required]]
    });
  }

  addHabilidad(): void {
    (this.tareaForm.get('persona.habilidades') as FormArray).push(this.initFormHabilidad());
  }

  removeHabilidad(index: number): void {
    (this.tareaForm.get('persona.habilidades') as FormArray).removeAt(index);
  }

  onSubmit(): void {    
    if (this.tareaForm.valid) {
      const tarea: Task = this.tareaForm.value;
      this.servicio.agregarTarea(tarea).subscribe(() => {
        console.log(tarea)
        this.router.navigate(['/tarea-listas']);
      });
    }
  }

  listaTareas(): void {
    this.router.navigate(['/tarea-listas']);
  }

}
