import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PoliNotesV2';
  login:boolean;
  constructor(private rout:ActivatedRoute){
    if(!localStorage.getItem("LocalSesion")){
      this.login=true;
    }else{
      this.login=false;
    }

    setTimeout(function(){
      localStorage.removeItem("LocalSesion");
    },120000);
  }
}
