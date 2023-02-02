import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.css'],
})
export class CustomerSupportComponent {
  content: string = '';
  constructor(public matDialogRef: MatDialogRef<CustomerSupportComponent>) {}
  submit() {
    this.matDialogRef.close(this.content);
  }
}
