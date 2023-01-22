import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
  ],
})
export class AntdModule {}
