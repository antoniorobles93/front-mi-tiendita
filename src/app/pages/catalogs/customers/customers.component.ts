import { Component, OnInit } from '@angular/core';
import { GeneralServicesService } from "../../services/general-services.service";
import { CustomersService } from "./services/customers.service";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Cliente } from "./interfaces/cliente";

@Component({
  selector: 'ngx-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [ConfirmationService, MessageService]

})
export class CustomersComponent implements OnInit {

  clientes: any;

  cliente: Cliente;

  submitted: boolean;

  displayModalCtes: boolean = false;

  constructor(
    private generalServicesService: GeneralServicesService,
    private customersService: CustomersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.consultaClientes();
  }

  showModalCtes() {
    this.cliente = {};
    this.displayModalCtes = true;
    this.submitted = false;
  }

  closeModalCtes() {
    this.displayModalCtes = false;
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

  guardarCliente() {
    this.submitted = true;
    if (Boolean(this.cliente.nombre) && Boolean(this.cliente.apellido)) {
      this.customersService.guardarCliente(this.cliente.nombre, this.cliente.apellido).subscribe(
        (response: any) => {
          if (response.statusCode == 1) {
            this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Cliente agregado correctamente!', life: 3000 });
          }
          this.closeModalCtes();
          this.consultaClientes();
        }
      )
    }
  }
  
}
