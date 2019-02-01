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
  usuario: Iusuario = {
    id_user: null,
    doc_user: null,
    nick_user: null,
    password_user: null,
    nombre_user: null,
    apellidos_user: null,
    celular_user: null,
    correo_user: null,
    id_perfil_user: null,
    estado_user: null,
  };
  constructor(private _us: UsuarioService,
    private root: Router) { }
  registro: string = "";
  nickname:boolean;
  mail:boolean;
  doc:boolean;
  load:boolean;
  validateError:boolean;
  mensaje:string;

  ngOnInit() {
  }

  guardar(forma: NgForm) {
    this.nickname = false;
    this.mail=false;
    this.doc = false;
    this.validateError=false;
    this.load=false;
    this.mensaje=null;
    let user: Usuario = new Usuario();
    user.setNick_user(forma.value.user);
    user.setDoc_user(forma.value.documento);
    user.setNombre_user(forma.value.nombre);
    user.setApellidos_user(forma.value.apellido);
    user.setCelular_user(forma.value.cel);
    user.setCorreo_user(forma.value.email);
    user.setPassword_user(forma.value.pass);

    this._us.Registrar(user).subscribe(data => {
      if (data) {
        let ruta = this.root;
        this.registro = "ok";
        setTimeout(function() { ruta.navigate(['login']); }, 3000);

      } else {
        this.registro = "error";

      }
      console.log(data)
    });

  }

  limpiar(formulario: NgForm) {
    formulario.reset();
  }

  onChange(usuario: any) {
    if (usuario.value !== "") {
      this.load = true;
      if (usuario.name === "user") {

        this._us.validarRegistro("ValidarNick", usuario.value).subscribe(data =>{
          this.validateError = <boolean>data;
          if(this.validateError){
            this.mensaje="Este nombre de usuario no se encuentra disponible.";
            this.nickname = true;
          }else{
            this.nickname = false;
          }

        });
      } else if (usuario.name === "documento") {
        this._us.validarRegistro("ValidarDoc", usuario.value).subscribe(data =>{
          this.validateError = <boolean>data;
          if(this.validateError){
            this.mensaje="Este documento ya se encuentra registrado.";
            this.doc = true;
          }else{
            this.doc = false;
          }

        });
      } else if (usuario.name === "email") {
        this._us.validarRegistro("ValidarEmail", usuario.value).subscribe(data =>{
          this.validateError = <boolean>data;
          if(  this.validateError){
            this.mensaje = "Este correo ya se encuentra registrado.";
            this.mail = true;
          }else{
            this.mail=false;
          }

        });
      }
      setTimeout(function(){},3000);
      this.load = false;
    }

  }

}
