import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'sales-list',
      pathMatch: 'full',
    },
    {
      path: 'sales',
      loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
    },
    {
      path: 'sales-list',
      loadChildren: () => import('./sales-list/sales-list.module').then(m => m.SalesListModule)
    },
    {
      path: 'catalogs',
      loadChildren: () => import('./catalogs/catalogs.module').then(m => m.CatalogsModule)
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
