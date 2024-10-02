import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TareaFormComponent } from './component/tarea-form/tarea-form.component';
import { TareaListaComponent } from './component/tarea-lista/tarea-lista.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TareaFormComponent,
    TareaListaComponent,
    RouterOutlet,
    RouterLink,    
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,    
    HttpClientModule,  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tarea';
}
