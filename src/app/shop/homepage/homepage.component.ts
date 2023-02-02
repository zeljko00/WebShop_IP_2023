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
  saveTab() {
    sessionStorage.setItem('tab', this.tabIndex.toString());
  }
  ngOnInit(): void {
    if (sessionStorage.getItem('tab'))
      this.tabIndex = Number(sessionStorage.getItem('tab'));
  }
}
