import { Routes } from '@angular/router';
import { TareaFormComponent } from './component/tarea-form/tarea-form.component';
import { TareaListaComponent } from './component/tarea-lista/tarea-lista.component';
import { TareaDetalleComponent } from './component/tarea-detalle/tarea-detalle.component';

export const routes: Routes = [
    {path: 'tarea-form', component: TareaFormComponent},
    {path: 'tarea-listas', component: TareaListaComponent},
    {path: 'tarea-detalle/:id', component: TareaDetalleComponent},
    {path: '', redirectTo: '/tarea-form', pathMatch: 'full'},

];
