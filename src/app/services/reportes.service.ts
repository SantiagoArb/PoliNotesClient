import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PUERTO } from '../clases/constantes';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private _http: HttpClient,
    private route: Router) { }


    getEstudianteMateria(idx: string) {
      let Params = new HttpParams();

      // Begin assigning parameters
      Params = Params.append('idx', idx);
      return this._http.get(`http://localhost:${PUERTO}/reportexcon`, { params: Params }).pipe(map(data => data));

    }
}
