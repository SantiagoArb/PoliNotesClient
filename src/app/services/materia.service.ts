import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../clases/usuario.clase';
import { Router } from '@angular/router';
import { PUERTO } from '../clases/constantes';
import { Materia } from '../clases/materia.clase';
import { materia_est } from '../clases/materia_est.clase';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {


  constructor(private _http:HttpClient,
              private route:Router) { }

    getMaterias(idx:string){
      let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idx', idx);
      return this._http.get(`http://localhost:${PUERTO}/allmats`,{ params:Params }).pipe( map(data => data));

    }

    guardarMAteria(mat:Materia){
      let usuarioJson = JSON.stringify(mat);
      return this._http.post(`http://localhost:${PUERTO}/newmat`, usuarioJson).pipe( map(data => data));
    }

    guardarEstudianteMateria(mat:materia_est){
      let usuarioJson= JSON.stringify(mat);
      console.log(usuarioJson);
      return this._http.post(`http://localhost:${PUERTO}/estmat`, usuarioJson).pipe( map(data => data));
    }

    getEstudianteMateria(idx:string){
      let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idx', idx);
      return this._http.get(`http://localhost:${PUERTO}/getestmat`,{ params:Params }).pipe( map(data => data));

    }

    deleteEstudianteMateria(idx:string,doc:string){
      let Params = new HttpParams();


    // Begin assigning parameters
    Params = Params.append('idx', idx);
    Params=  Params.append('doc',doc);
      return this._http.get(`http://localhost:${PUERTO}/deletestmat`,{ params:Params }).pipe( map(data => data));

    }
}
