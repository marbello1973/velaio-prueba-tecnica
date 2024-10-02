import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../component/interface/task';  

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  private url: string = 'http://localhost:8080/tareas';
  
  constructor(private http: HttpClient) { }

  getTareas(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}`);
  }

  agregarTarea(tarea: Task): Observable<any> {
    return this.http.post<Task>(this.url, tarea);
  }

  actualizarTarea(id: number, tarea: Task): Observable<Task> {
    return this.http.put<Task>(`${this.url}/${id}`, tarea);
  }

  eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  obtenerTareaPorId(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.url}/${id}`);
  }

}
