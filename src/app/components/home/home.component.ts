import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
estudiante = false;
  constructor(private router:Router,
              private _as:AuthService) {

    if(!this._as.obtenerSesion()){
      this.router.navigate(['/login']);
      console.log("no hay session");
    }
  }

  ngOnInit() {
  }

}
