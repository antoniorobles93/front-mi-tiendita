import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { CatalogsComponent } from './catalogs.component';
import { ArticlesComponent } from "./articles/articles.component";
import { BrandedArticlesComponent } from './branded-articles/branded-articles.component';
import { CustomersComponent } from './customers/customers.component';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { VatPercentageComponent  } from "./vat-percentage/vat-percentage.component";

@NgModule({
  declarations: [CatalogsComponent, ArticlesComponent, BrandedArticlesComponent, CustomersComponent, VatPercentageComponent],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DividerModule,
    DialogModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
    InputNumberModule,
    DropdownModule
  ]
})
export class CatalogsModule { }
