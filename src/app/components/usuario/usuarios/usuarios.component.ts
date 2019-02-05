import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/clases/usuario.clase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario;
  userEdit:any;
  delete:boolean;
  bodyText:string;
  estado:boolean;
  constructor(private _us: UsuarioService,
              private router:Router) {
    if(!localStorage.getItem('LocalSesion')){
      this.router.navigate(['/login']);

      console.log("no hay session");
    }
    this.getAllUsers();
    this.userEdit = null;

  }

  ngOnInit() {

      }



  getAllUsers() {
    this._us.getAllUsers().subscribe(data => {
      this.usuarios = <any> data;
      console.log(this.usuarios)});
  }
  eliminar(id:any, doc:any){
     let user:Usuario = new Usuario();
    user.setId_user(id);
    user.setDoc_user(doc);

    this._us.deleteUser(user).subscribe(data => {
      this.delete =<boolean> data;
      this.getAllUsers();
      setTimeout(function(){
        this.delete = null;
      },3000);
    })
    console.log(id,doc);
  }

  editar(data:any){
    this.userEdit = data;
  }

  actualizar(forma){
    console.log(forma.value);
    let user:Usuario = new Usuario();
    user.setNick_user(forma.value.user);
    user.setDoc_user(forma.value.documento);
    user.setNombre_user(forma.value.nombre);
    user.setApellidos_user(forma.value.apellidos);
    user.setCelular_user(forma.value.celular);
    user.setCorreo_user(forma.value.correo);
    user.setPassword_user(forma.value.pass);

    this._us.actualizar(user).subscribe(data => {
      if(data){
        this.estado = true;
      }else{
        this.estado = false;
      }
      new Promise(resolve => setTimeout(()=>resolve(), 3000)).then(()=>{
        this.getAllUsers();
        this.estado = null;
        this.userEdit = null;
      });


    });

  }

  cancelarEdit(){
    this.userEdit = null;
    this.getAllUsers();
  }
}
