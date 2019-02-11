import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { MateriaService } from 'src/app/services/materia.service';
import { materia_est } from 'src/app/clases/materia_est.clase';

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
  ConcertSelect:any;
  comentario:string;
  constructor(private _us:UsuarioService,
              private router:Router,
            private _ms: MateriaService) {
              this.comentario ="";
    if (!localStorage.getItem('LocalSesion')) {
      this.router.navigate(['/login']);
    } else {
      this.perfil = JSON.parse( localStorage.getItem('LocalSesion'));
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

CargarNotas(mat){

  let datos = new materia_est();
  datos.setId_materia(mat.id_materia);
  datos.setDoc_estudiante(this.perfil.doc_USER);
  this.students =[];
  this.matSelected = mat
  console.log(datos);
  this._ms.getMisNotas(datos).subscribe(data=>{
    this.ConcertSelect = <any> data;
    console.log(data);
  });

}

cargarComentario(nota){
  this.comentario = nota.comentario;
  console.log(nota);
}

}
