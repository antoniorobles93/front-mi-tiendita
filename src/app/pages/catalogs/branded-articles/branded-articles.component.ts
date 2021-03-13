import { Component, OnInit } from '@angular/core';
import { BrandedArticlesService } from "./services/branded-articles.service";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Marca } from "./interfaces/marca";

@Component({
  selector: 'ngx-branded-articles',
  templateUrl: './branded-articles.component.html',
  styleUrls: ['./branded-articles.component.scss'],
  providers: [ConfirmationService, MessageService]

})
export class BrandedArticlesComponent implements OnInit {

  marcas: any;

  marca: Marca;

  submitted: boolean;

  displayModalMarcas: boolean = false;


  constructor(
    private brandedArticlesService: BrandedArticlesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.consultaMarcas();
  }

  showModalMarcas() {
    this.marca = {};
    this.displayModalMarcas = true;
    this.submitted = false;
  }

  closeModalMarcas() {
    this.displayModalMarcas = false;
    this.submitted = false;
  }

  consultaMarcas() {
    this.brandedArticlesService.consultaMarcas().subscribe(
      (response: any) => {
        var arrayResponse: any = [];
        for (let i = 0; i < response.length; i++) {
          arrayResponse.push({
            id_marca: response[i].id_marca,
            nombre_marca: response[i].nombre_marca,
            descripcion_marca: response[i].descripcion_marca
          })
        }
        this.marcas = arrayResponse;
      }
    )
  }

  guardarMarca() {
    this.submitted = true;
    if (Boolean(this.marca.nombre) && Boolean(this.marca.descripcion)) {
      this.brandedArticlesService.guardarMarca(this.marca.nombre, this.marca.descripcion).subscribe(
        (response: any) => {
          if (response.statusCode == 1) {
            this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Marca guardada correctamente!', life: 3000 });
          }
          this.closeModalMarcas();
          this.consultaMarcas();
        }
      )
    }
  }
}
