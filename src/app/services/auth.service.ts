import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getSesion() {
    if (localStorage.getItem('LocalSesion')) {
      let jsonSession = JSON.parse(localStorage.getItem('LocalSesion'));
      if (jsonSession.id_PERFIL_USER === 1) {
        return "estudiante";
      } else if (jsonSession.id_PERFIL_USER === 2) {
        return "maestro"
      }

    }
  }

  


}
