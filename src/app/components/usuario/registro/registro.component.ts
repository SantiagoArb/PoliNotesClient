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
    estado_user: null
  };
  perfiles:any=[];
  constructor(private _us: UsuarioService,
    private root: Router) {
      this._us.getPerfiles().subscribe(data=>{
        this.perfiles = data;
        console.log(this.perfiles);
      })
    }
  registro: string = "";
  nickname: boolean;
  mail: boolean;
  doc: boolean;
  load: boolean = false;
  validateError: boolean;
  mensaje: string;
  confirmError = null;
  mailError = null;
  nickError = null;
  docError = null;

  ngOnInit() {
  }

  guardar(forma: NgForm) {
    this.nickname = false;
    this.mail = false;
    this.doc = false;
    this.validateError = false;
    this.load = false;
    this.mensaje = null;
    let user: Usuario = new Usuario();
    user.setNick_user(forma.value.user);
    user.setDoc_user(forma.value.documento);
    user.setNombre_user(forma.value.nombre);
    user.setApellidos_user(forma.value.apellido);
    user.setCelular_user(forma.value.cel);
    user.setCorreo_user(forma.value.email);
    user.setPassword_user(forma.value.pass);
    user.setId_perfil_user(forma.value.perfil);
    console.log(user);
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
    this.mensaje = "";
    this.confirmError = false;
  }

  onChange(usuario: any) {
    this.confirmError = false;
    this.load = true;
    if (usuario.value !== "") {

      if (usuario.name === "user") {

        this._us.validarRegistro("ValidarNick", usuario.value).subscribe(data => {
          this.validateError = <boolean>data;
          if (this.validateError) {
            this.mensaje = "Este nombre de usuario no se encuentra disponible.";
            this.nickname = true;
          } else {
            this.nickname = false;
          }

        });
      } else if (usuario.name === "documento") {
        this._us.validarRegistro("ValidarDoc", usuario.value).subscribe(data => {
          this.validateError = <boolean>data;
          if (this.validateError) {
            this.mensaje = "Este documento ya se encuentra registrado.";
            this.doc = true;
          } else {
            this.doc = false;
          }

        });
      } else if (usuario.name === "email") {
        this._us.validarRegistro("ValidarEmail", usuario.value).subscribe(data => {
          this.validateError = <boolean>data;
          if (this.validateError) {
            this.mensaje = "Este correo ya se encuentra registrado.";
            this.mail = true;
          } else {
            this.mail = false;
          }

        });
      }

    }

     new Promise(resolve => setTimeout(()=>resolve(), 3000)).then(()=>{
       if(this.validateError){
         if(this.mail){
           this.mailError = true;
         }else{
           this.mailError = false;
         }
         if(this.doc){
           this.docError = true;
         }else{
           this.docError = false;
         }
         if(this.nickname){
           this.nickError = true;
         }else{
           this.nickError = false;
         }
         this.confirmError = true;
       }
       this.load=false
     });
   }




}
