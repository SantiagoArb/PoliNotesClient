import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario.clase';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfil:Usuario;
  estado:string="";
  constructor(private router:Router,
              private _us:UsuarioService) {

    if(!localStorage.getItem('LocalSesion')){
      this.router.navigate(['/login']);
      console.log("no hay session");
    }else{
      this.perfil = JSON.parse(localStorage.getItem("LocalSesion"));
      console.log(this.perfil);
    }

  }

  actualizar(forma: NgForm){
    let user:Usuario = new Usuario();
    user.setNick_user(forma.value.user);
    user.setDoc_user(forma.value.documento);
    user.setNombre_user(forma.value.nombre);
    user.setApellidos_user(forma.value.apellidos);
    user.setCelular_user(forma.value.celular);
    user.setCorreo_user(forma.value.correo);
    user.setPassword_user(forma.value.pass);
    console.log(forma);
    return this._us.actualizar(user).subscribe(data => {
      if(data){
        let ruta = this.router;
        this.estado = "ok";
        let json = JSON.parse(localStorage.getItem('LocalSesion'));

        this._us.getInfoUser(json.nick_USER).subscribe(data =>{
          let jsonresp = JSON.stringify(data);
          localStorage.removeItem('LocalSesion');
          localStorage.setItem('LocalSesion',jsonresp);
          setTimeout(function(){ window.location.reload();},3000);

        });
        setTimeout(function(){ruta.navigate(['perfil']);},3000);
      }else{
        this.estado = "error"
      }
    });
  }

  ngOnInit() {
  }

}
