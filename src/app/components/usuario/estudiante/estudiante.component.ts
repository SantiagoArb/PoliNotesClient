import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {
  perfil:any;
  materias:any=[];
  matSelected:any;
  constructor(private _us:UsuarioService,
              private router:Router) {
    if (!localStorage.getItem('LocalSesion')) {
      this.router.navigate(['/login']);
    } else {

      this.cargarMisMaterias();
    }
  }

  ngOnInit() {
  }

  cargarEstudiantes(materia:any){
    this.matSelected = materia;
  }

cargarMisMaterias(){
    this.perfil = JSON.parse( localStorage.getItem('LocalSesion'));
this._us.getMisMaterias(this.perfil.doc_USER).subscribe(data=>{
  this.materias = data;
  console.log(data);
});
}

}
