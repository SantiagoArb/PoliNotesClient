import { Injectable } from '@angular/core';
import { PUERTO } from '../clases/constantes';
import { Usuario } from '../clases/usuario.clase';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient,
              private route:Router) { }

  getSesion() {
    if (sessionStorage.getItem('LocalSesion')) {
      let jsonSession = JSON.parse(atob(sessionStorage.getItem('LocalSesion')));
      if (jsonSession.id_PERFIL_USER === 1) {
        return "estudiante";
      } else if (jsonSession.id_PERFIL_USER === 2) {
        return "maestro"
      }

    }
  }

  obtenerSesion(){
    if (sessionStorage.getItem('LocalSesion')) {
      let jsonSession = JSON.parse(atob(sessionStorage.getItem('LocalSesion')));
      return jsonSession;

    }return null;
  }

  Loggear(user:Usuario){
     let usuarioJson = JSON.stringify(user);
     return this._http.post(`http://localhost:${PUERTO}/login`, usuarioJson).pipe( map(data => data));
   }

   LogOut(){
     sessionStorage.removeItem('LocalSesion');
     this.route.navigate(['/login']);
   }

  removeSesion(){
    sessionStorage.removeItem('LocalSesion');
  }

  setSession(data:any){
    let json = JSON.stringify(data);
    sessionStorage.setItem('LocalSesion',btoa(json));
  }




}
