import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../clases/usuario.clase';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  error:boolean;
  constructor(
              private root:Router, private _as:AuthService) {
                if(this._as.obtenerSesion()){
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
    this._as.Loggear(user).subscribe(data => {
      if(data){
        this._as.setSession(data);

        window.location.reload();
      }else{
        this.error = true;
      }
    });
  }

  userLoged(data:any){
    this._as.setSession(btoa(data));


  }


}
