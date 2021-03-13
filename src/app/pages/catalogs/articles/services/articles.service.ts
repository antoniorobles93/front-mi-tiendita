import { Injectable } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private http: HttpClient
  ) { }

  guardarCliente(nombreArticulo: any, precioArticulo: any, idMarca:any) {
    return this.http.post(environment.dnsService + '/api/guardararticulo', { nombre_articulo: nombreArticulo, precio_articulo: precioArticulo, id_marca: idMarca }).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
