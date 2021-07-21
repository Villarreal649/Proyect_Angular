import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PeliculaService } from 'src/app/services/pelicula.service';


@Component({
  selector: 'app-create-pelicula',
  templateUrl: './create-pelicula.component.html',
  styleUrls: ['./create-pelicula.component.css']
})
export class CreatePeliculaComponent implements OnInit {
  createPelicula: FormGroup;
  submitted=false;
  loading=false;
  id: string|null;
  titulo='Agregar/Editar Peliculas';

  constructor( private fb: FormBuilder,
                private _peliculaService:PeliculaService,
                private router:Router,
                private toastr: ToastrService,
                private aRoute:ActivatedRoute) { 
    this.createPelicula=this.fb.group({
      nombre: ['',Validators.required],
      director: ['',Validators.required],
      protagonista: ['',Validators.required],
      estudio: ['',Validators.required],

    })
    this.id=this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.esEditar();
  }
  agregarEditarPelicula(){
    this.submitted=true;
    if(this.createPelicula.invalid){
      return;
    }
    if(this.id === null){
      this.titulo='Agregar Pelicula';
      this.agregarPelicula();
    }else{
      this.titulo='Editar Pelicula';
      this.editarPelicula(this.id);
      
    }
  }
  agregarPelicula(){
  
    const pelicula: any ={
      nombre:this.createPelicula.value.nombre,
      director:this.createPelicula.value.director,
      protagonista:this.createPelicula.value.protagonista,
      estudio:this.createPelicula.value.estudio,
      fechaCreacion:new Date(),
      fechaActualizacion: new Date()
    }
    this.loading=true;
    this._peliculaService.agregarPelicula(pelicula).then(() =>{
      this.toastr.info('TODOS LOS DATOS ESTAN CORRECTOS', 'LA PELICULA SE REGISTRO',{
        positionClass:"toast-bottom-right"
      });
      this.loading=false;
      this.router.navigate(['/list-peliculas'])
    }).catch(error=>{
      console.log(error);
      this.loading=false;
    })
  
  }
  editarPelicula(id:string){

    const pelicula: any ={
      nombre:this.createPelicula.value.nombre,
      director:this.createPelicula.value.director,
      protagonista:this.createPelicula.value.protagonista,
      estudio:this.createPelicula.value.estudio,
      fechaActualizacion: new Date()
    }
    this.loading=true;
    this._peliculaService.actualizarPelicula(id, pelicula).then(()=>{
      this.loading=false;
      this.toastr.info('La pelicula se actualizo correctamente','PELICULA ACTUALIZADA',{
        positionClass:'toast-bottom-right'
      })
      this.router.navigate(['/list-peliculas']);
    })
  }


  esEditar(){
    if(this.id !==null){
      this.loading=true;
      this._peliculaService.getPelicula(this.id).subscribe(data=>{
        this.loading=false;
        console.log(data.payload.data()['nombre']);
        this.createPelicula.setValue({
         nombre: data.payload.data()['nombre'],
         director: data.payload.data()['director'],
         protagonista: data.payload.data()['protagonista'],
         estudio: data.payload.data()['estudio'],
           
         
       })
      })
    }
  }

}
