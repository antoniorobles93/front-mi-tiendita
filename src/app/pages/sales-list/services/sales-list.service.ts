import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesListService {

  constructor(
    private http: HttpClient
  ) { }

  consultaVentas(){
    return this.http.get(environment.dnsService + '/api/ventas').pipe(
      map((response) => {
        return response;
      })
    );
    /*return this.http.get(environment.dnsService + '/api/ventas').subscribe(
      (response:any) =>{
        return response;
      }
    )*/
  }
}