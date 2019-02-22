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
import { AuthService } from 'src/app/services/auth.service';

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
  concertToDelente:any;
  flagSortByName: boolean;
  flagSortByDoc: boolean;
  newMat: boolean;
  newEst: boolean;
  perfil: any;
  estado: boolean;
  materias: any = [];
  matSelected: any = [];
  estudiantes: any[];
  students: any = [];
  studentsAux: any = [];
  flagEditar: boolean;
  facultades: any = [];
  facultadSelected: any;
  estadoCon: boolean;
  ConcertSelect: any = [];
  conSelect: any;
  valorConcertado: any;
  concertacion: IConcertacion = {
    id_concertacion: null,
    nom_concertacion: null,
    porcentaje: null,
    doc_maestro: null,
    id_materia: null
  };
  constructor(private _ms: MateriaService,
    private router: Router,
    private _fs: FacultadService,
    private _as: AuthService) {
    this.flagEditar = true;
    this.matSelected = null;
    this.newMat = false;
    this.newEst = false;
    this.flagSortByName = true;
    this.flagSortByDoc = true;

    this._fs.getFacultades().subscribe(data => {
      this.facultades = data;
    })

    if (!this._as.obtenerSesion()) {
      this.router.navigate(['/login']);
    } else {
      this.cargarMaterias();
    }

  }

  ngOnInit() {
  }

  cargarMaterias() {
    this.perfil = this._as.obtenerSesion();
    this._ms.getMaterias(this.perfil.id_USUARIO).subscribe(data => {
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

  editarNotas(item: NgForm) {


    if (this.flagEditar) {
      this.flagEditar = false
    } else {
      this.flagEditar = true;
    }
  }



  cargarEstudiantes(mat: any) {
    this.students = [];
    this.matSelected = mat
    this._ms.getConcertacionMateria(this.matSelected.id_MATERIA).subscribe(data => {
      this.ConcertSelect = <any>data;
    });

  }

  CargarNotas(select: any) {
    if (select.value.id_concertacion === null) {
        this.conSelect = null;
    } else {
      if(select.value === "Seleccione"){
        this.conSelect = null;
      }else{
        this.conSelect = select;
        this._ms.getEstudianteMateria(this.matSelected.id_MATERIA, select.value).subscribe(data => {
          this.students = <any>data;
          this.studentsAux = this.students;
        });
      }

    }

  }

  guardarRow(item: any) {
    let nota: materia_est = new materia_est();
    nota.setDoc_estudiante(item.doc_estudiante);
    nota.setId_con(item.id_con);
    nota.setNota(item.nota);
    nota.setId_nota(item.id_nota);
    nota.setComentario(item.comentario);

    this._ms.setNota(nota).subscribe(data => {
      this.estado = <any>data;
      new Promise(resolve => setTimeout(() => resolve(), 2000)).then(() => {
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
      new Promise(resolve => setTimeout(() => resolve(), 2000)).then(() => {
        this.cargarEstudiantes(this.matSelected);
        formulario.reset();
        this.newEst = false;
        this.estado = null;
      });

    })

  }

  eliminarEst(est: any) {

    this._ms.deleteEstudianteMateria(est.id_materia, est.doc_estudiante).subscribe(data => {
      this.estado = <boolean>data;
      this.estado = <boolean>data;
      new Promise(resolve => setTimeout(() => resolve(), 2000)).then(() => {
        this.cargarEstudiantes(this.matSelected);
        this.estado = null;
      });
    })
  }



  setConcertacion(formulario: NgForm) {
    let con: Concertacion = new Concertacion();
    con.setNom_concertacion(formulario.value.nombre);
    con.setValor_porcentual(formulario.value.valor);
    con.setId_materia(this.matSelected.id_MATERIA)
    this.perfil = this._as.obtenerSesion();
    con.setDoc_maestro(this.perfil.doc_USER);
    con.setId_usuario(this.matSelected.id_MAESTRO);
    this._ms.guardarConcertacion(con).subscribe(data => {
      this.estadoCon = <boolean>data;
      new Promise(resolve => setTimeout(() => resolve(), 2000)).then(() => {
        if (this.estadoCon) {
          formulario.reset();
          this.validarConcertacion();
          this.cargarEstudiantes(this.matSelected);
          this.estadoCon = null;
        }
      });


    });
  }

  validarConcertacion() {

    this._ms.getValorConcertado(this.matSelected.id_MATERIA).subscribe(data => {
      this.valorConcertado = data;
    });
  }

  actualizarConcertacion(data: any) {
    let concertacion: Concertacion = new Concertacion();
    concertacion.setId_concertacion(data.id_concertacion);
    concertacion.setNom_concertacion(data.nom_concertacion);
    concertacion.setValor_porcentual(data.valor_porcentual);
    this._ms.updateConcertacion(concertacion).subscribe(data => {
      this.estadoCon = <boolean>data;
      new Promise(resolve => setTimeout(() => resolve(), 2000)).then(() => {
        this.estadoCon = null;
        this.validarConcertacion();
        this.cargarEstudiantes(this.matSelected);
      });
    });
  }

  guardarTodos(students: any) {

    this._ms.guardarNotas(students).subscribe(data => {
      this.estado = <boolean>data;
      new Promise(resolve => setTimeout(() => resolve(), 2000)).then(() => {
        this.estado = null;
        this.CargarNotas(this.ConcertSelect);
      });
    });
  }

  deleteConcertacion() {
    let data = this.concertToDelente;
    let obj: materia_est = new materia_est();
    obj.setId_con(data.id_concertacion);
    obj.setId_materia(this.matSelected.id_MATERIA);
    this._ms.deleteConcertacion(obj).subscribe(data => {
      this.estadoCon = <boolean>data;
      new Promise(resolve => setTimeout(() => resolve(), 2000)).then(() => {
        this.estadoCon = null;
        this.validarConcertacion();
        this.cargarEstudiantes(this.matSelected);
        this.concertToDelente = null;
      });

    });
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


asignarConcertacion(concertacion:any){
  this.concertToDelente = concertacion;
}
}
