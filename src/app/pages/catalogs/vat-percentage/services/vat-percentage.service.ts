import { Injectable } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VatPercentageService {

  constructor(
    private http: HttpClient
  ) { }

  actualizarPorcentaje(cantitdadPorcentaje: any) {
    return this.http.post(environment.dnsService + '/api/actualizarporcentaje', { cantidad_porcentaje: cantitdadPorcentaje }).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
