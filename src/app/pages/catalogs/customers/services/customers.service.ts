import { Injectable } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(
    private http: HttpClient
  ) { }

  guardarCliente(nombreCliente: any, apellidoCliente: any) {
    return this.http.post(environment.dnsService + '/api/guardarcliente', { nombre_cliente: nombreCliente, apellido_cliente: apellidoCliente }).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
