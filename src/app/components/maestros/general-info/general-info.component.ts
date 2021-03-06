import { Component, OnInit } from '@angular/core';
import { MateriaService } from 'src/app/services/materia.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Materia } from 'src/app/clases/materia.clase';
import { NgForm } from '@angular/forms';
import { FacultadService } from 'src/app/services/facultad.service';
import { Imateria } from 'src/app/Interfaces/materia.interface';
import { materia_est } from 'src/app/clases/materia_est.clase';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {
  materia: Imateria = {
    id_materia: null,
    codigo_materia: null,
    nombre_materia: null,
    facultad_materia: null,
    id_maestro: null,
    doc_estudiante: null,
    nom_estudiante: null
  }
  perfil:any;
  materias:any;
  newMat: boolean;
  newEst: boolean;
estToDelente:any;
  estado: boolean;

  matSelected: any = [];
  estudiantes: any[];
  students: any = [];
  noStudents:any;
  studentsAux: any = [];
  flagEditar: boolean;
  facultades: any = [];
  facultadSelected: any;
  estadoCon: boolean;
  ConcertSelect: any;
  conSelect: any;
  flagSortByName: boolean;
  flagSortByDoc: boolean;
  valorConcertado: any;
  constructor(private _ms:MateriaService,
              private _as:AuthService,
              private router:Router,
              private _fs: FacultadService) {

                this.flagSortByName = true;
                this.flagSortByDoc = true;
                this.newMat = false;
                this.newEst = false;
                this.matSelected = null;
                this._fs.getFacultades().subscribe(data => {
                  this.facultades = data;
                });
                if (!this._as.obtenerSesion()) {
                  this.router.navigate(['/login']);
                } else {
                  this.perfil= this._as.obtenerSesion();
                  this._ms.getCantidadEstudiantes(this.perfil.id_USUARIO).subscribe(data =>{

                    this.materias = data;
                  });
                }

   }

   openForm() {
     if (this.newMat) {
       this.newMat = false;
     } else {
       this.newMat = true;
       this.newEst = false;
     }
   }

   guardar(formulario: NgForm) {
     this.perfil = this._as.obtenerSesion();
     let mat: Materia = new Materia();
     mat.setID_MATERIA("1");
     mat.setCODIGO_MATERIA(formulario.value.codigo);
     mat.setNOMBRE_MATERIA(formulario.value.nombre);
     mat.setFACULTAD_MATERIA(this.facultadSelected);
     mat.setID_MAESTRO(this.perfil.id_USUARIO);

     this._fs.getFacultades().subscribe(data => {
       this.facultades = data;
     });

     this._ms.guardarMAteria(mat).subscribe(data => {
       this.estado = <boolean>data;
       new Promise(resolve => setTimeout(() => resolve(), 2000)).then(() => {
         this.cargarMaterias();
         formulario.reset();
         this.newMat = false;
         this.estado = null;
       });


     });
   }

   eliminarMat(mat: any) {
     if (this.matSelected) {
       this._ms.deleteMateria(this.matSelected.id_materia).subscribe(data => {
         this.estado = <boolean>data;
         new Promise(resolve => setTimeout(() => resolve(), 2000)).then(() => {
           this.cargarMaterias();
           this.newMat = false;
           this.newEst = false;
           this.estado = null;
           this.matSelected = null;
         });
       });
     }

   }

   cargarEstudiantes(mat: any) {
     console.log("materi", mat);
     this.noStudents =false;
     this.students = [];
     this.matSelected = mat;
     this._ms.getEstudiantePorMateria(this.matSelected.id_materia).subscribe(data => {
         this.students = <any>data;


       if(this.students.length === 0){
          this.noStudents=true;
       }else{
         this.noStudents = false;
       }

     });

   }

   cargarMaterias() {
     this.perfil = this._as.obtenerSesion();
     this._ms.getMaterias(this.perfil.id_USUARIO).subscribe(data => {
       this.materias = data;
       console.log("Materias",data);
     });
   }

  ngOnInit() {
  }

  orderByDoc(students) {
    if (this.flagSortByDoc) {
      this.students = students.sort(function(a, b) {

        if (a.doc_estudiante < b.doc_estudiante) {
          return -1;
        }
        if (a.doc_estudiante > b.doc_estudiante) {
          return 1;
        }
        // a debe ser igual b
        return 0;
      });
      this.flagSortByDoc = false;
    } else {
      this.students = students.sort(function(a, b) {
        if (a.doc_estudiante < b.doc_estudiante) {
          return 1;
        }
        if (a.doc_estudiante > b.doc_estudiante) {
          return -1;
        }
        // a debe ser igual b
        return 0;
      });
      this.flagSortByDoc = true;
    }
  }

  orderByname(students) {

    if (this.flagSortByName) {
      this.students = students.sort(function(a, b) {

        if (a.nom_estudiante < b.nom_estudiante) {
          return -1;
        }
        if (a.nom_estudiante > b.nom_estudiante) {
          return 1;
        }
        // a debe ser igual b
        return 0;
      });
      this.flagSortByName = false;
    } else {
      this.students = students.sort(function(a, b) {
        if (a.nom_estudiante < b.nom_estudiante) {
          return 1;
        }
        if (a.nom_estudiante > b.nom_estudiante) {
          return -1;
        }
        // a debe ser igual b
        return 0;
      });
      this.flagSortByName = true;
    }
  }

  searchEstudiante(buscar: string) {
    this.students = this.studentsAux;
    if (buscar !== "") {
      let result = null;
      result = this.studentsAux.find(word => word.doc_estudiante === buscar);
      if (result !== undefined) {
        this.students = [];
        this.students.push(result);
      }

      if (this.students === this.studentsAux) {
        let result = null;
        result = this.studentsAux.find(word => word.nom_estudiante === buscar);
        if (result !== undefined) {
          this.students = [];
          this.students.push(result);
        }
      }
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

  guardarEstudiante(formulario: NgForm) {
    let obj = new materia_est();
    obj.setDoc_estudiante(formulario.value.documento);
    obj.setNom_estudiante(formulario.value.nombre);
    obj.setId_materia(this.matSelected.id_materia);
    this._ms.guardarEstudianteMateria(obj).subscribe(data => {
      this.estado = <boolean>data;
      new Promise(resolve => setTimeout(() => resolve(), 2000)).then(() => {
        this.cargarEstudiantes(this.matSelected);
        formulario.reset();
        this.newEst = false;
        this.estado = null;
      });

    })

  }

  asignarEstudiante(est:any){
    this.estToDelente = est;
  }

  eliminarEst(){
    let data: materia_est = new materia_est();
    data.setDoc_estudiante(this.estToDelente.doc_estudiante);
    data.setId_materia(this.matSelected.id_materia);
    this._ms.deleteEstudiante(data).subscribe(data => {
      this.estado =<boolean> data;
      new Promise(resolve => setTimeout(() => resolve(), 2000)).then(() => {
        this.cargarEstudiantes(this.matSelected);
        this.estado = null;
      });
    })

  }

}
