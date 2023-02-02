import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-buying-modal',
  templateUrl: './buying-modal.component.html',
  styleUrls: ['./buying-modal.component.css'],
})
export class BuyingModalComponent {
  numberFormControl = new FormControl('', [Validators.required]);
  dataRequired: boolean = false;
  requiredData: string = '';
  number: string = '';
  paying: string = 'pri preuzimanju';
  constructor(public matDialogRef: MatDialogRef<BuyingModalComponent>) {}
  render() {
    if (this.paying === 'kartično') {
      this.dataRequired = true;
      this.requiredData = 'Broj kartice';
    } else if ((this.paying = 'paypal')) {
      this.dataRequired = true;
      this.requiredData = 'ID';
    } else {
      this.dataRequired = false;
      this.number = '';
    }
  }
  submit() {
    this.numberFormControl.markAsTouched();
    if (this.numberFormControl.valid || this.dataRequired === false)
      this.matDialogRef.close(this.paying + ' ' + this.number);
  }
}
