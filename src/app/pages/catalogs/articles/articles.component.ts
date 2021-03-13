import { Component, OnInit } from '@angular/core';
import { GeneralServicesService } from "../../services/general-services.service";
import { ArticlesService } from "./services/articles.service";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Articulo } from "./interfaces/articulo";
import { Marca } from "./interfaces/marca";


@Component({
  selector: 'ngx-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [ConfirmationService, MessageService]

})
export class ArticlesComponent implements OnInit {

  articulos: any;

  articulo: Articulo;

  submitted: boolean;

  displayModalArticulos: boolean = false;

  cities: any[];

  marca: Marca;
  marcas: any;

  selectedCityCode: string;

  constructor(
    private generalServicesService: GeneralServicesService,
    private articlesService: ArticlesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.consultaArticulos();
    this.consultaMarcas();
  }

  showModalArticulos() {
    this.articulo = {}
    this.displayModalArticulos = true;
    this.submitted = false;
  }

  closeModalArticulos() {
    this.displayModalArticulos = false;
    this.submitted = false;
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


  consultaMarcas() {
    this.generalServicesService.consultaMarcas().subscribe(
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

  GuardarMarca() {
    this.submitted = true;
    if(Boolean(this.articulo.nombre) && Boolean(this.articulo.precio) && Boolean(this.marca)){
      this.articlesService.guardarCliente(this.articulo.nombre, this.articulo.precio,this.marca).subscribe(
        (response: any) => {
          if (response.statusCode == 1) {
            this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Articulo agregado correctamente!', life: 3000 });
          }
          this.closeModalArticulos();
          this.consultaArticulos();
        }
      )
    }
  }

}
