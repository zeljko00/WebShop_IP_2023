import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AntdModule } from '../antd/antd.module';
import { MaterialModule } from '../material/material.module';
import { ActivationDialogComponent } from './activation-dialog/activation-dialog.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ActivationDialogComponent,
  ],
  imports: [CommonModule, AccountRoutingModule, AntdModule, MaterialModule],
})
export class AccountModule {}
