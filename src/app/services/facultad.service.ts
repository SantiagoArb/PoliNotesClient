import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../clases/usuario.clase';
import { Router } from '@angular/router';
import { PUERTO } from '../clases/constantes';


@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  constructor(private _http: HttpClient) { }

  getFacultades(){
    return this._http.get(`http://localhost:${PUERTO}/allfacult`).pipe(map(data => data));
  }
}
