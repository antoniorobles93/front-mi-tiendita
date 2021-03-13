import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesListRoutingModule } from './sales-list-routing.module';
import { SalesListComponent } from './sales-list.component';

import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [SalesListComponent],
  imports: [
    CommonModule,
    SalesListRoutingModule,
    CardModule,
    TableModule,
    ButtonModule
  ]
})
export class SalesListModule { }
