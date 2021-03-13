import { Injectable } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandedArticlesService {

  constructor(
    private http: HttpClient
  ) { }

  consultaMarcas() {
    return this.http.get(environment.dnsService + '/api/marcas').pipe(
      map((response) => {
        return response;
      })
    );
  }

  guardarMarca(nombreMarca: any, descripcionMarca: any) {
    return this.http.post(environment.dnsService + '/api/guardarmarca', { nombre_marca: nombreMarca, descripcion_marca: descripcionMarca }).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
