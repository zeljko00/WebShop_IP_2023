import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-activation-dialog',
  templateUrl: './activation-dialog.component.html',
  styleUrls: ['./activation-dialog.component.css'],
})
export class ActivationDialogComponent {
  public code: string = '';
  constructor(public matDialogRef: MatDialogRef<ActivationDialogComponent>) {}
  activate() {
    console.log(this.code);
    this.matDialogRef.close(this.code);
  }
}
