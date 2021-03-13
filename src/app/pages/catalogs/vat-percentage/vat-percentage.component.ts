import { Component, OnInit } from '@angular/core';
import { VatPercentageService } from "./services/vat-percentage.service";
import * as moment from 'moment';
import { GeneralServicesService } from "../../services/general-services.service";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'ngx-vat-percentage',
  templateUrl: './vat-percentage.component.html',
  styleUrls: ['./vat-percentage.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class VatPercentageComponent implements OnInit {

  porcentajes: any;

  submitted: boolean;

  editporcentaje : any;

  displayModalPorcentaje: boolean = false;

  constructor(
    private vatPercentageService: VatPercentageService,
    private generalServicesService: GeneralServicesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {
    this.consultaPorcentaje();
  }

  showModalEditPorcentaje() {
    this.editporcentaje = this.porcentajes[0].cantidad_porcentaje;
    this.displayModalPorcentaje = true;
    this.submitted = false;
  }

  closeModalAEditPorcentaje() {
    this.displayModalPorcentaje = false;
    this.submitted = false;
  }

  consultaPorcentaje() {
    this.generalServicesService.consultaPorcentaje().subscribe(
      (response: any) => {
        var arrayResponse: any = [];
        for (let i = 0; i < response.length; i++) {
          arrayResponse.push({
            id_porcentaje: response[i].id_porcentaje,
            cantidad_porcentaje: response[i].cantidad_porcentaje,
            fecha_modificacion_porcentaje: (moment(response[i].fecha_modificacion_porcentaje)).format("DD/MM/YYYY")
          })
        }
        console.log(arrayResponse);

        this.porcentajes = arrayResponse;
      }
    )
  }

  actualizarPorcentaje(){
    console.log(this.editporcentaje);
    this.submitted = true;
      this.vatPercentageService.actualizarPorcentaje(this.editporcentaje).subscribe(
        (response: any) => {
          if (response.statusCode == 1) {
            this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Porcentaje actualizado correctamente!', life: 3000 });
          }
          this.consultaPorcentaje();
          this.closeModalAEditPorcentaje();
        }
      )
  }

}
