import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  constructor(private firestore: AngularFirestore
    ) { }

  agregarPelicula(pelicula: any): Promise<any>{
return this.firestore.collection('peliculas').add(pelicula);
  }
  getPeliculas(): Observable<any>{
    return this.firestore.collection('peliculas',ref=>ref.orderBy('fechaCreacion','asc')).snapshotChanges();
  }
  eliminarPelicula(id:string):Promise<any>{
    return this.firestore.collection('peliculas').doc(id).delete();
  }
  getPelicula(id:string):Observable<any>{
    return this.firestore.collection('peliculas').doc(id).snapshotChanges();
  }
  actualizarPelicula(id: string, data:any):Promise<any>{
    return this.firestore.collection('peliculas').doc(id).update(data);
  }
}
