import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { AntdModule } from '../antd/antd.module';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent, HeaderComponent],
  imports: [CommonModule, AccountRoutingModule, AntdModule],
})
export class AccountModule {}
