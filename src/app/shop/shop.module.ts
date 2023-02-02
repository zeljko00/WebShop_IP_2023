import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { CardComponent } from './card/card.component';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './header/header.component';
import { ShopComponent } from './shop/shop.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlSrb } from './CustomPaginator';
import { FormsModule } from '@angular/forms';
import { AntdModule } from '../antd/antd.module';
import { HomepageComponent } from './homepage/homepage.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { PersonalInfoSettingsComponent } from './personal-info-settings/personal-info-settings.component';
import { BuyingModalComponent } from './buying-modal/buying-modal.component';

@NgModule({
  declarations: [
    CardComponent,
    HeaderComponent,
    ShopComponent,
    ProfileComponent,
    PurchaseHistoryComponent,
    ProductInfoComponent,
    HomepageComponent,
    CustomerSupportComponent,
    PersonalInfoSettingsComponent,
    BuyingModalComponent,
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
