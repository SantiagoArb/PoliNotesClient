import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  tperfil:string ="";
  flagSubmenu:boolean;
  constructor(private _as:AuthService) {
  this.tperfil = this._as.getSesion();
  }

  ngOnInit() {
}

submenu(){
  if(this.flagSubmenu){
    this.flagSubmenu = false;
  }else{
    this.flagSubmenu = true;
  }

}



}
