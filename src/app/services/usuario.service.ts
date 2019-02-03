import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../clases/usuario.clase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
perfil:Usuario;
port:number = 8090;
  constructor(private _http:HttpClient,
              private route:Router) { }

  Loggear(user:Usuario){
     let usuarioJson = JSON.stringify(user);
     return this._http.post(`http://localhost:${this.port}/login`, usuarioJson).pipe( map(data => data));
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
     return this._http.post(`http://localhost:${this.port}/registro`, usuarioJson).pipe( map(data => data));
   }

   actualizar(user:Usuario){
     let usuarioJson = JSON.stringify(user);
     console.log(user);
      return this._http.post(`http://localhost:${this.port}/update`, usuarioJson).pipe( map(data => data));
   }

   getInfoUser(user:string){

     return this._http.post(`http://localhost:${this.port}/getinfouser`, user).pipe( map(data => data));
   }

   getAllUsers(){
     return this._http.get(`http://localhost:${this.port}/allusers`).pipe( map(data => data));
   }

   deleteUser(user:Usuario){
     let usuarioJson = JSON.stringify(user);
     return this._http.post(`http://localhost:${this.port}/deleteuser`,usuarioJson).pipe( map(data => data));
   }

   validarRegistro(key:string,user:string){
     let Params = new HttpParams();

   // Begin assigning parameters
   Params = Params.append('key', key);
   Params = Params.append('valor', user);
     let usuarioJson = JSON.stringify(user);
     return this._http.get(`http://localhost:${this.port}/validate`,{ params:Params }).pipe( map(data => data));
   }
}
