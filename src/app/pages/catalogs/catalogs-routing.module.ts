import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogsComponent } from "./catalogs.component";
import { ArticlesComponent } from "./articles/articles.component";
import { BrandedArticlesComponent } from "./branded-articles/branded-articles.component";
import { CustomersComponent } from "./customers/customers.component";
import { VatPercentageComponent } from "./vat-percentage/vat-percentage.component";

const routes: Routes = [
  {
    path: '',
    component: CatalogsComponent,
    children: [
      { path: 'articles', component: ArticlesComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'branded-articles', component: BrandedArticlesComponent },
      { path: 'percentage', component: VatPercentageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogsRoutingModule { }
