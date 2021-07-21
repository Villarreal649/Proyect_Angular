import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListPeliculasComponent} from './components/list-peliculas/list-peliculas.component';
import { CreatePeliculaComponent } from './components/create-pelicula/create-pelicula.component';

const routes: Routes = [
  {path: '', redirectTo: 'list-peliculas',pathMatch:'full'},
  {path: 'list-peliculas', component: ListPeliculasComponent},
  {path : 'create-pelicula', component: CreatePeliculaComponent},
  {path : 'editPelicula/:id', component: CreatePeliculaComponent},
  {path: '**', redirectTo: 'list-peliculas',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
