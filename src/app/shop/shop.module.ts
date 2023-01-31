import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { CardComponent } from './card/card.component';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { ShopComponent } from './shop/shop.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { SaleComponent } from './sale/sale.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlSrb } from './CustomPaginator';
import { FormsModule } from '@angular/forms';
import { AntdModule } from '../antd/antd.module';

@NgModule({
  declarations: [
    CardComponent,
    NavbarComponent,
    HeaderComponent,
    ShopComponent,
    ProfileComponent,
    PurchaseHistoryComponent,
    SaleComponent,
    ProductInfoComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    MaterialModule,
    FormsModule,
    AntdModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlSrb }],
})
export class ShopModule {}
