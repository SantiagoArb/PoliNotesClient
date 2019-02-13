import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
sesionActual:any;
  constructor(
              private _as:AuthService) {
      this.sesionActual = this._as.obtenerSesion();
   }

  ngOnInit() {
  }


salir(){
this._as.LogOut();
}
}
