import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { MateriaService } from 'src/app/services/materia.service';
import { materia_est } from 'src/app/clases/materia_est.clase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {
  perfil:any;
  materias:any=[];
  matSelected:any;
  students:any=[];
  ConcertSelect:any=[];
  comentario:string;
  noNotas= false;
  constructor(private _us:UsuarioService,
              private router:Router,
            private _ms: MateriaService,
            private _as:AuthService) {
              this.comentario ="";
    if (!this._as.obtenerSesion()) {
      this.router.navigate(['/login']);
    } else {
      this.perfil = this._as.obtenerSesion() ;
      this.cargarMisMaterias();
    }
  }

  ngOnInit() {
  }

  cargarEstudiantes(materia:any){
    this.matSelected = materia;
  }

cargarMisMaterias(){
    this.perfil = this._as.obtenerSesion();
this._us.getMisMaterias(this.perfil.doc_USER).subscribe(data=>{
  this.materias = data;
});
}

CargarNotas(mat){
  this.noNotas = false;

  let datos = new materia_est();
  datos.setId_materia(mat.id_materia);
  datos.setDoc_estudiante(this.perfil.doc_USER);
  this.students =[];
  this.matSelected = mat
  this._ms.getMisNotas(datos).subscribe(data=>{
    this.ConcertSelect = <any> data;
    if(this.ConcertSelect.length === 0){
      this.noNotas = true;
    }
  });

}

cargarComentario(nota){
  this.comentario = nota.comentario;
}

}
