import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralServicesService {

  constructor(
    private http: HttpClient
  ) { }

  consultaClientes() {
    return this.http.get(environment.dnsService + '/api/clientes').pipe(
      map((response) => {
        return response;
      })
    );
  }

  consultaArticulos() {
    return this.http.get(environment.dnsService + '/api/articulos').pipe(
      map((response) => {
        return response;
      })
    );
  }

  consultaMarcas() {
    return this.http.get(environment.dnsService + '/api/marcas').pipe(
      map((response) => {
        return response;
      })
    );
  }

  consultaPorcentaje(){
    return this.http.get(environment.dnsService + '/api/porcentaje').pipe(
      map((response) => {
        return response;
      })
    );
  }

}
