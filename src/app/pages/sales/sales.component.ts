import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2'
import { SalesService } from "./services/sales.service";
import { Router } from '@angular/router';
import { GeneralServicesService } from "../services/general-services.service";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [ConfirmationService, MessageService]
})

export class SalesComponent implements OnInit {

  nombre_cliente: string = '';

  articulos: any;
  clientes: any;
  shopping: any;
  currentIdCliente: any;

  displayModalCtes: boolean = false;
  displayModalArticulos: boolean = false;

  clienteSelected: any;
  articuloSelected: any;


  subTotal: any = 0;
  iva: any = 0;
  total: any = 0;

  guardarDisabled: boolean = true;

  articulosBtn: boolean = true;

  porcentajeIva: any;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private salesService: SalesService,
    private router: Router,
    private generalServicesService: GeneralServicesService
  ) { }

  ngOnInit(): void {
    this.consultaPorcentaje();
  }

  consultaClientes() {
    this.generalServicesService.consultaClientes().subscribe(
      (response: any) => {
        var arrayResponse: any = [];
        for (let i = 0; i < response.length; i++) {
          arrayResponse.push({
            id_cliente: response[i].id_cliente,
            nombre_cliente: response[i].nombre_cliente,
            apellido_cliente: response[i].apellido_cliente
          })
        }
        this.clientes = arrayResponse;
      }
    )
  }

  consultaArticulos() {
    this.generalServicesService.consultaArticulos().subscribe(
      (response: any) => {
        var arrayResponse: any = [];
        for (let i = 0; i < response.length; i++) {
          arrayResponse.push({
            id_articulo: response[i].id_articulo,
            nombre_articulo: response[i].nombre_articulo,
            marca_articulo: response[i].marca_articulo,
            precio_articulo: response[i].precio_articulo
          })
        }
        this.articulos = arrayResponse;
      }
    )
  }

  consultaPorcentaje() {
    this.generalServicesService.consultaPorcentaje().subscribe(
      (response: any) => {
        this.porcentajeIva = response[0].cantidad_porcentaje;
      }
    )
  }

  showModalCtes() {
    this.consultaClientes();
    this.displayModalCtes = true;
  }

  showModalArticulos() {
    this.consultaArticulos();
    this.displayModalArticulos = true;
  }

  onRowSelectedCliente(event: any) {
    if (event) {
      this.currentIdCliente = event.data.id_cliente;
      this.nombre_cliente = event.data.nombre_cliente + ' ' + event.data.apellido_cliente;
      this.clienteSelected = event.data;
      this.articulosBtn = false;
    }
    this.displayModalCtes = false;
  }

  onRowSelectedArticulo(event: any) {
    this.articuloSelected = [event.data];
    this.displayModalArticulos = false;


    if (this.shopping == undefined) {
      for (let i = 0; i < this.articuloSelected.length; i++) {
        this.shopping = [
          {
            id_articulo: this.articuloSelected[i].id_articulo,
            nombre_articulo: this.articuloSelected[i].nombre_articulo,
            marca_articulo: this.articuloSelected[i].marca_articulo,
            cantidad_articulo: 1,
            precio_articulo: this.articuloSelected[i].precio_articulo,
            importe_articulo: this.articuloSelected[i].precio_articulo * 1.
          }
        ]
      }
    } else {

      /*this.shopping.push(
        {
          id_articulo: event.data.id_articulo,
          nombre_articulo: event.data.nombre_articulo,
          marca_articulo: event.data.marca_articulo,
          cantidad_articulo: 1,
          precio_articulo: event.data.precio_articulo,
          importe_articulo: event.data.precio_articulo * 1
        }
      );*/

      //Valida si el articulo ya esta insertado y si lo esta le añade 1
      for (let i = 0; i < this.shopping.length; i++) {
        if (this.shopping[i].id_articulo == event.data.id_articulo) {
          let cantidadArticulo = this.shopping[i].cantidad_articulo
          this.shopping.filter(someobject => someobject.id_articulo == event.data.id_articulo)
            .forEach(someobject => someobject.cantidad_articulo = cantidadArticulo + 1);
        } else {
          this.shopping.push(
            {
              id_articulo: event.data.id_articulo,
              nombre_articulo: event.data.nombre_articulo,
              marca_articulo: event.data.marca_articulo,
              cantidad_articulo: 1,
              precio_articulo: event.data.precio_articulo,
              importe_articulo: event.data.precio_articulo * 1
            }
          );
        }
        break;
      }
    }
    this.TotalAndSubTotal();
  }

  onEditCancel(event: any) {
    console.log(event);
  }

  onEditComplete(event: any) {
    for (let i = 0; i < this.shopping.length; i++) {
      this.shopping[i].importe_articulo = this.shopping[i].cantidad_articulo * this.shopping[i].precio_articulo;
    }
    this.TotalAndSubTotal();
  }

  deleteProduct(shopping: any) {
    this.confirmationService.confirm({
      message: 'Estar seguro que deseas elminar el articulo ' + shopping.nombre_articulo + '?',
      header: 'Eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.shopping = this.shopping.filter((val: any) => val.id_articulo !== shopping.id_articulo);
        //this.shopping = {};
        this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Articulo Eliminado!', life: 3000 });

        if (this.shopping === undefined || this.shopping.length == 0) {
          this.subTotal = 0;
          this.iva = 0;
          this.total = 0;
          this.guardarDisabled = true;
        } else {
          this.TotalAndSubTotal();
        }
      }
    });

  }

  TotalAndSubTotal() {
    let arr: any = this.shopping;
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      if (parseInt(arr[i].importe_articulo))
        total += parseInt(arr[i].importe_articulo);
    }
    this.subTotal = total;
    this.iva = ((this.porcentajeIva / 100.00) * total).toFixed(2);
    this.total = parseInt(this.subTotal) + parseInt(this.iva);
    this.guardarDisabled = false;
  }

  exitAlert() {
    Swal.fire({
      title: 'Estas seguro?',
      text: "La venta no podra ser realizada!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/pages/sales-list']);
      }
    })
  }

  guardarVenta() {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Desea guardar su venta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No!',
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        this.guardaVenta();
      }
    })
  }

  guardaVenta() {
    this.salesService.guardarVenta(this.subTotal, this.currentIdCliente).subscribe(
      (response: any) => {
        if (response.statusCode == 1) {
          Swal.fire(
            'Bien hecho!',
            'Tu venta ha sido registrada correctamente!',
            'success'
          )
          this.router.navigate(['/pages/sales-list']);
        }
      }
    )
  }
}
