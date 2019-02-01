import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../clases/usuario.clase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  error:boolean;

  constructor(private _us: UsuarioService,
              private root:Router) {
                if(localStorage.getItem('LocalSesion')){
                  this.root.navigate(['/home']);
                }
               }

  ngOnInit() {
  }

  Loggear(form: NgForm) {
    this.error = false;
    let user:Usuario = new Usuario();
    user.setNick_user(form.value.user);
    user.setPassword_user(form.value.pass);
    user.setNombre_user("Santiago");
    user.setApellidos_user("Arbelaez");
    user.setCorreo_user("Santiagoarb@gmail.com");
    user.setDoc_user("1020475804");
    user.setCelular_user("3186098090");
    this._us.Loggear(user).subscribe(data => {
      if(data){
        this.userLoged(data);

        window.location.reload();
      }else{
        this.error = true;
      }
    });
  }

  userLoged(data:any){
    let json = JSON.stringify(data);
    localStorage.setItem('LocalSesion',json);
    console.log(data);
  }


}
