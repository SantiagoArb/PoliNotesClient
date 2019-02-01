import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Iusuario } from 'src/app/Interfaces/usuario.interface';
import { Usuario } from 'src/app/clases/usuario.clase';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario:Iusuario={
    id_user: null,
    doc_user: null,
    nick_user: null,
    password_user: null,
    nombre_user:null,
    apellidos_user: null,
    celular_user:null,
    correo_user: null,
    id_perfil_user: null,
    estado_user: null,
  };
  constructor(private _us:UsuarioService,
  private root:Router) { }
  registro:string="";
  ngOnInit() {
  }

  guardar(forma:NgForm){
    let user:Usuario = new Usuario();
    user.setNick_user(forma.value.user);
    user.setDoc_user(forma.value.documento);
    user.setNombre_user(forma.value.nombre);
    user.setApellidos_user(forma.value.apellido);
    user.setCelular_user(forma.value.cel);
    user.setCorreo_user(forma.value.email);
    user.setPassword_user(forma.value.pass);

    this._us.Registrar(user).subscribe(data => {
      if(data){
        let ruta = this.root;
        this.registro = "ok";
        setTimeout(function(){ruta.navigate(['login']);},3000);

      }else{
        this.registro="error";

      }
      console.log(data)
    });

  }

}