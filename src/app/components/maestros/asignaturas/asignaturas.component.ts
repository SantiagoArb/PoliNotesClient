import { Component, OnInit } from '@angular/core';
import { Imateria } from 'src/app/Interfaces/materia.interface';
import { NgForm } from '@angular/forms';
import { MateriaService } from 'src/app/services/materia.service';
import { Materia } from 'src/app/clases/materia.clase';
import { Router } from '@angular/router';
import { materia_est } from 'src/app/clases/materia_est.clase';
import { FacultadService } from 'src/app/services/facultad.service';
import { IConcertacion } from 'src/app/Interfaces/concertacion.interface';
import { Concertacion } from 'src/app/clases/concertacion.clase';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {

  materia: Imateria = {
    id_materia: null,
    codigo_materia: null,
    nombre_materia: null,
    facultad_materia: null,
    id_maestro: null,
    doc_estudiante: null,
    nom_estudiante: null
  }
  newMat: boolean;
  newEst: boolean;
  perfil: any;
  estado: boolean;
  materias: any = [];
  matSelected: any = [];
  estudiantes: any[];
  students:any=[];
  flagEditar:boolean;
  facultades:any=[];
  facultadSelected:any;
  estadoCon:boolean;
  ConcertSelect:any;
  concertacion:IConcertacion={
    id_concertacion:null,
    nom_concertacion:null,
    porcentaje:null,
    doc_maestro:null,
    id_materia:null
  };
  constructor(private _ms: MateriaService,
              private router: Router,
              private _fs:FacultadService) {
      this.flagEditar = true;
    this.matSelected = null;
    this.newMat = false;
    this.newEst = false;

    this._fs.getFacultades().subscribe(data=>{
      this.facultades = data;
      console.log(data);
    })

    if (!localStorage.getItem('LocalSesion')) {
      this.router.navigate(['/login']);
    } else {
      this.cargarMaterias();
    }

  }

  ngOnInit() {
  }

  cargarMaterias(){
    this.perfil = JSON.parse(localStorage.getItem("LocalSesion"));
    this._ms.getMaterias(this.perfil.id_USUARIO).subscribe(data => {
      console.log(data);
      this.materias = data;
    })
  }

  openForm() {
    if (this.newMat) {
      this.newMat = false;
    } else {
      this.newMat = true;
      this.newEst = false;
    }
  }

  openFormEst() {
    if (this.newEst) {
      this.newEst = false;
    } else {
      this.newEst = true;
      this.newMat = false;
    }
  }

  editarNotas(item:NgForm){


    if(this.flagEditar){
      this.flagEditar = false
    }else{
      this.flagEditar = true;
    }
    console.log(item);
  }

  guardar(formulario: NgForm) {
    this.perfil = JSON.parse(localStorage.getItem("LocalSesion"));
    let mat: Materia = new Materia();
    mat.setID_MATERIA("1");
    mat.setCODIGO_MATERIA(formulario.value.codigo);
    mat.setNOMBRE_MATERIA(formulario.value.nombre);
    mat.setFACULTAD_MATERIA(this.facultadSelected);
    mat.setID_MAESTRO(this.perfil.id_USUARIO);

    this._ms.guardarMAteria(mat).subscribe(data => {
      this.estado = <boolean>data;
      new Promise(resolve => setTimeout(()=>resolve(), 3000)).then(()=>{
        this.cargarMaterias();
        formulario.reset();
        this.newMat = false;
        this.estado = null;
      });


    });
  }

  cargarEstudiantes(mat: any) {
      this.students =[];
      this.matSelected = mat
      console.log(this.matSelected);
      this._ms.getConcertacionMateria(this.matSelected.id_MATERIA).subscribe(data =>{
        this.ConcertSelect =<any> data;
        console.log(data);
      });

      console.log(this.matSelected);

}

CargarNotas(select:any){
  if(select.value.id_concertacion === null){

  }else{
    console.log(select);
    this._ms.getEstudianteMateria(this.matSelected.id_MATERIA, select.value).subscribe(data => {
      this.students =<any> data;
      console.log(data);
    });
  }

}

guardarRow(item:any){
let nota:materia_est = new materia_est();
nota.setDoc_estudiante(item.doc_estudiante);
nota.setId_con(item.id_con);
nota.setNota(item.nota);
nota.setId_nota(item.id_nota);

this._ms.setNota(nota).subscribe(data =>{
  this.estado =<any> data;
  new Promise(resolve => setTimeout(()=>resolve(), 3000)).then(()=>{
      this.estado = null;
  });

})
}

  guardarEstudiante(formulario: NgForm) {
    let obj = new materia_est();
    obj.setDoc_estudiante(formulario.value.documento);
    obj.setNom_estudiante(formulario.value.nombre);
    obj.setId_materia(this.matSelected.id_MATERIA);
    this._ms.guardarEstudianteMateria(obj).subscribe(data => {
      this.estado = <boolean>data;
      new Promise(resolve => setTimeout(()=>resolve(), 3000)).then(()=>{
        this.cargarEstudiantes(this.matSelected);
        formulario.reset();
        this.newEst = false;
        this.estado = null;
      });

    })

  }

  eliminarEst(est:any){

    this._ms.deleteEstudianteMateria(est.id_materia,est.doc_estudiante).subscribe(data=>{
      this.estado = <boolean>data;
      this.estado = <boolean>data;
      new Promise(resolve => setTimeout(()=>resolve(), 3000)).then(()=>{
        this.cargarEstudiantes(this.matSelected);
        this.estado = null;
      });
    })
    console.log(est);
  }

  eliminarMat(mat:any){
    if(this.matSelected){
      this._ms.deleteMateria(this.matSelected.id_MATERIA).subscribe(data =>{
        this.estado = <boolean>data;
        new Promise(resolve => setTimeout(()=>resolve(), 3000)).then(()=>{
          this.cargarMaterias();
          this.newMat = false;
          this.newEst = false;
          this.estado = null;
          this.matSelected=null;
        });
      });
    }

  }

  setConcertacion(formulario:NgForm){
    let con:Concertacion = new Concertacion();
    con.setNom_concertacion(formulario.value.nombre);
    con.setValor_porcentual(formulario.value.valor);
    con.setId_materia(this.matSelected.id_MATERIA)
    this.perfil = JSON.parse(localStorage.getItem("LocalSesion"));
    con.setDoc_maestro(this.perfil.doc_USER);
    con.setId_usuario(this.matSelected.id_MAESTRO);
    console.log(con);
    this._ms.guardarConcertacion(con).subscribe(data =>{
      this.estadoCon = <boolean>data;
      new Promise(resolve => setTimeout(()=>resolve(), 3000)).then(()=>{
        if(this.estadoCon){
          formulario.reset();
          window.location.reload();
        }
      });


    });
  }

}
