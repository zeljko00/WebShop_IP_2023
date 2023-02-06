import { Component, OnInit } from '@angular/core';

import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  tabIndex: number = 0;
  guest: boolean = true;
  saveTab() {
    sessionStorage.setItem('tab', this.tabIndex.toString());
  }
  constructor() {
    if (
      sessionStorage.getItem('guest') &&
      sessionStorage.getItem('guest') === 'false'
    )
      this.guest = false;

    console.log('homepage guest-' + this.guest);
  }
  ngOnInit(): void {
    if (sessionStorage.getItem('tab'))
      this.tabIndex = Number(sessionStorage.getItem('tab'));
  }
}
