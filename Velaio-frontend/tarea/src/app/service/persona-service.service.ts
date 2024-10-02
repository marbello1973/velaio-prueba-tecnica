import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../component/interface/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {

  private apiUrl = 'http://localhost:8080/persona';

  constructor( public http: HttpClient) { }

  obtenerPersonas(): Observable<Persona[]> {   
    return this.http.get<Persona[]>(this.apiUrl);
  }
}
