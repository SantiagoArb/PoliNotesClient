import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../clases/usuario.clase';
import { Router } from '@angular/router';
import { PUERTO } from '../clases/constantes';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
perfil:Usuario;
port:number = 8080;
  constructor(private _http:HttpClient,
              private route:Router) { }

  Loggear(user:Usuario){
     let usuarioJson = JSON.stringify(user);
     return this._http.post(`http://localhost:${PUERTO}/login`, usuarioJson).pipe( map(data => data));
   }

   LogOut(){
     localStorage.removeItem('LocalSesion');
     this.route.navigate(['/login']);
   }

   getSesionActual(){
     return this.perfil = JSON.parse(localStorage.getItem("LocalSesion"));
   }

   Registrar(user:Usuario){
     let usuarioJson = JSON.stringify(user);
     console.log(usuarioJson);
     return this._http.post(`http://localhost:${PUERTO}/registro`, usuarioJson).pipe( map(data => data));
   }

   actualizar(user:Usuario){
     let usuarioJson = JSON.stringify(user);
     console.log(user);
      return this._http.post(`http://localhost:${PUERTO}/update`, usuarioJson).pipe( map(data => data));
   }

   getInfoUser(user:string){

     return this._http.post(`http://localhost:${PUERTO}/getinfouser`, user).pipe( map(data => data));
   }

   getAllUsers(){
     return this._http.get(`http://localhost:${PUERTO}/allusers`).pipe( map(data => data));
   }

   deleteUser(user:Usuario){
     let usuarioJson = JSON.stringify(user);
     return this._http.post(`http://localhost:${PUERTO}/deleteuser`,usuarioJson).pipe( map(data => data));
   }

   validarRegistro(key:string,user:string){
     let Params = new HttpParams();

   // Begin assigning parameters
   Params = Params.append('key', key);
   Params = Params.append('valor', user);
     return this._http.get(`http://localhost:${PUERTO}/validate`,{ params:Params }).pipe( map(data => data));
   }
}
