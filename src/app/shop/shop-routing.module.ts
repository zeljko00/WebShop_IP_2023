import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductInfoComponent } from './product-info/product-info.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'product',
    component: ProductInfoComponent,
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
