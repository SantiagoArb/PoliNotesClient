import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
sesionActual:any;
  constructor(private _us:UsuarioService) {
      this.sesionActual = this._us.getSesionActual();
      console.log(this.sesionActual);
   }

  ngOnInit() {
  }


salir(){
this._us.LogOut();
}
}
