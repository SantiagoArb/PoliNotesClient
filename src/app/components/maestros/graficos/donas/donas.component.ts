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
      console.log(data);
      this.materias = data;
    })
  }

  cargarGrafica(materia:any){
    this.pieChartLabels =[];
    this.pieChartData = [];

    this._rs.getEstudianteMateria(materia.id_MATERIA).subscribe(data => {
      let resultado:Array<Object> = <Array<Object>> data;
      console.log(data);
      for(let i = 0; i<resultado.length;i++){
        let value = <any> resultado[i];
        this.pieChartLabels.push(value.nombre_Con);
        this.pieChartData.push(value.aprovaron);
      }
      console.log(this.pieChartLabels);
      console.log(this.pieChartData);
    });

    this.matSelected = materia;
  }



  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
