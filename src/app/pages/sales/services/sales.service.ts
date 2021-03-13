import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(
    private http: HttpClient
  ) { }

  guardarVenta(totalVenta: any, idCliente: any) {
    return this.http.post(environment.dnsService + '/api/guardarventa', { total_venta: totalVenta, id_cliente: idCliente }).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
