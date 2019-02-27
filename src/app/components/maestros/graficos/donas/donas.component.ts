import { Component } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-donas',
  templateUrl: './donas.component.html',
  styleUrls: ['./donas.component.css']
})
export class DonasComponent {

  public pieChartColors:Array<any> = [
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
     },{ // dark grey
       backgroundColor: 'rgb(61, 247, 241)',
       borderColor: 'rgba(77,83,96,1)',
       pointBackgroundColor: 'rgba(77,83,96,1)',
       pointBorderColor: '#fff',
       pointHoverBackgroundColor: '#fff',
       pointHoverBorderColor: 'rgba(77,83,96,1)'
     },
     { // dark grey
       backgroundColor: 'rgb(61, 247, 73)',
       borderColor: 'rgba(77,83,96,1)',
       pointBackgroundColor: 'rgba(77,83,96,1)',
       pointBorderColor: '#fff',
       pointHoverBackgroundColor: '#fff',
       pointHoverBorderColor: 'rgba(77,83,96,1)'
     },{ // dark grey
       backgroundColor: 'rgb(206, 247, 61)',
       borderColor: 'rgba(77,83,96,1)',
       pointBackgroundColor: 'rgba(77,83,96,1)',
       pointBorderColor: '#fff',
       pointHoverBackgroundColor: '#fff',
       pointHoverBorderColor: 'rgba(77,83,96,1)'
     }

   ];
  public pieChartLabels:string[] = [];
 public pieChartData:number[] = [];
 public pieChartType:string = 'pie';
  perfil: any;
  materias: any = [];
  matSelected:any;

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
  cargarMaterias(){
    this.perfil = this._as.obtenerSesion();
    this._ms.getMaterias(this.perfil.id_USUARIO).subscribe(data => {
      this.materias = data;
    })
  }

  cargarGrafica(materia:any){


    this._rs.getEstudianteMateria(materia.id_MATERIA).subscribe(data => {
      this.pieChartLabels =[];
      this.pieChartData=[];
      let resultado:Array<Object> = <Array<Object>> data;
      for(let i = 0; i<resultado.length;i++){
        let value = <any> resultado[i];
        this.pieChartLabels.unshift(value.nombre_Con);
        this.pieChartData.unshift(value.aprovaron);
      }

      if(this.pieChartLabels.length === 0 ){
        this.matSelected = false;
      }else{
        this.matSelected = materia;
      }

    });


  }



  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
