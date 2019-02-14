import { Component, OnInit } from '@angular/core';
import { MateriaService } from 'src/app/services/materia.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {
  perfil:any;
  materias:any;
  constructor(private _ms:MateriaService,
              private _as:AuthService,
              private router:Router) {
                if (!this._as.obtenerSesion()) {
                  this.router.navigate(['/login']);
                } else {
                  this.perfil= this._as.obtenerSesion();
                  this._ms.getCantidadEstudiantes(this.perfil.id_USUARIO).subscribe(data =>{
                    console.log(data);
                    this.materias = data;
                  });
                }

   }

  ngOnInit() {
  }

}
