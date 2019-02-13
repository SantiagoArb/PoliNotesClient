import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario.clase';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfil:any;
  estado:string="";
  constructor(private router:Router,
              private _us:UsuarioService,
              private _as:AuthService) {

    if(!this._as.obtenerSesion()){
      this.router.navigate(['/login']);
    }else{
      this.perfil = this._as.obtenerSesion();
    }

  }

  actualizar(forma: NgForm){
    let user:Usuario = new Usuario();
    user.setNick_user(forma.value.user);
    user.setDoc_user(this.perfil.doc_USER);
    user.setNombre_user(forma.value.nombre);
    user.setApellidos_user(forma.value.apellidos);
    user.setCelular_user(forma.value.celular);
    user.setCorreo_user(forma.value.correo);
    user.setPassword_user(forma.value.pass);
    return this._us.actualizar(user).subscribe(data => {
      if(data){
        let ruta = this.router;

        let json = this._as.obtenerSesion();

        this._us.getInfoUser(json.nick_USER).subscribe(data =>{
          this._as.removeSesion();
          this._as.setSession(data);
            this.estado = "ok";

            new Promise(resolve => setTimeout(()=>resolve(), 2000)).then(()=>{
              ruta.navigate(['perfil']);
              this.estado = "";
            });
        });

      }else{
        this.estado = "error"
      }
    });
  }

  ngOnInit() {
  }

}
