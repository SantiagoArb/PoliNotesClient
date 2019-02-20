import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-barras',
  templateUrl: './barras.component.html',
  styleUrls: ['./barras.component.css']
})
export class BarrasComponent implements OnInit {
  public barChartOptions:any = {
   scaleShowVerticalLines: false,
   responsive: true
 };
 public barChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgb(46, 39, 247)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgb(255, 63, 63)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }

  ];
  perfil: any;
  materias: any = [];
  matSelected:any;
  public barChartLabels:string[]=[];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  aprobados:number[]=[];
  reprobados:number[]=[];

  constructor(private _rs:ReportesService,
              private _as:AuthService,
              private router: Router,
            private _ms: MateriaService) {
    if (!this._as.obtenerSesion()) {
      this.router.navigate(['/login']);
    } else {
      this.cargarMaterias();
    }
   }

  ngOnInit() {
  }

  cargarMaterias(){
    this.perfil = this._as.obtenerSesion();
    this._ms.getMaterias(this.perfil.id_USUARIO).subscribe(data => {
      console.log(data);
      this.materias = data;
    })
  }

  cargarGrafica(materia:any){

    this.barChartLabels =[];



    this._rs.getEstudianteMateria(materia.id_MATERIA).subscribe(data => {

      let resultado:Array<Object> = <Array<Object>> data;
      console.log(data);

      if(resultado.length !== 0){
        for(let i = 0; i<resultado.length;i++){
          let value = <any> resultado[i];
          this.barChartLabels.push(value.nombre_Con);
          this.aprobados.unshift(value.aprovaron);
          this.reprobados.unshift(value.reprovaron);
        }
      }


      console.log("labels:",this.barChartLabels);
      console.log("aprobados:",this.aprobados);
      console.log("reprobados:",this.reprobados);
    });

    this.matSelected = materia;
  }

  public barChartData:any[] = [
    {data: this.aprobados, label: 'Aprobados'},
    {data: this.reprobados, label: 'Reprobados'}
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
