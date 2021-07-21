import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { elementAt } from 'rxjs-compat/operator/elementAt';
import { PeliculaService } from 'src/app/services/pelicula.service';

@Component({
  selector: 'app-list-peliculas',
  templateUrl: './list-peliculas.component.html',
  styleUrls: ['./list-peliculas.component.css']
})
export class ListPeliculasComponent implements OnInit {
  peliculas:any[]=[];

  constructor(private _peliculaService: PeliculaService,
    private toastr: ToastrService) {

   }

  ngOnInit(): void {
    this.getPeliculas()
  }
  getPeliculas(){
    this._peliculaService.getPeliculas().subscribe(data =>{
      this.peliculas=[];
    data.forEach((element:any) => {
       this.peliculas.push({
        id :element.payload.doc.id,
        ...element.payload.doc.data()
       })
       
      });
      console.log(this.peliculas);
    }); 
   }
   eliminarPelicula(id:string){
     this._peliculaService.eliminarPelicula(id).then(()=>{
       console.log('Pelicula eliminada con exito');
      this.toastr.error('La pelicula fue eliminada', 'REGISTRO ELIMINADO',{
        positionClass:'toast-bottom-right'
      });
      
      }).catch(error=>{
       console.log(error);
     })
   }
}
