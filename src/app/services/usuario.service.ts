import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../clases/usuario.clase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
perfil:Usuario;
  constructor(private _http:HttpClient,
              private route:Router) { }

  Loggear(user:Usuario){
     let usuarioJson = JSON.stringify(user);
     return this._http.post("http://localhost:8080/login", usuarioJson).pipe( map(data => data));
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
     return this._http.post("http://localhost:8080/registro", usuarioJson).pipe( map(data => data));
   }

   actualizar(user:Usuario){
     let usuarioJson = JSON.stringify(user);
     console.log(user);
      return this._http.post("http://localhost:8080/update", usuarioJson).pipe( map(data => data));
   }

   getInfoUser(user:string){

     return this._http.post("http://localhost:8080/getinfouser", user).pipe( map(data => data));
   }

   getAllUsers(){
     return this._http.get("http://localhost:8080/allusers").pipe( map(data => data));
   }

   deleteUser(user:Usuario){
     let usuarioJson = JSON.stringify(user);
     return this._http.post("http://localhost:8080/deleteuser",usuarioJson).pipe( map(data => data));
   }
}
