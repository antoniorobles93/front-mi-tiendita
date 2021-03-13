import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SalesListService } from "./services/sales-list.service";

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {
  shopping: any;

  constructor(
    private saleslistService: SalesListService
  ) { }

  ngOnInit(): void {
    this.consultaVentas();
  }


  consultaVentas() {
    this.saleslistService.consultaVentas().subscribe(
      (response: any) => {
        var arrayResponse:any = [];
        for (let i = 0; i < response.length; i++) {
          arrayResponse.push({
            no_folio:response[i].id_venta,
            no_cliente: response[i].id_cliente ,
            nombre_cliente: response[i].nombre_cliente +' ' + response[i].apellido_cliente ,
            total: response[i].total_venta,
            fecha_venta: (moment(response[i].fecha_venta)).format("DD/MM/YYYY")
          })
        }
        this.shopping = arrayResponse;
      }
    )
  }

}
