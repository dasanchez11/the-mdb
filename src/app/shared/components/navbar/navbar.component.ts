import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  optionsOpen = false;
  styleActive =
    'text-sky-500 border-sky-500 hover:text-sky-500 hover:border-sky-500';
  styleNormal =
    'border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100';
  constructor() {}

  ngOnInit(): void {}

  toggleOptions() {
    this.optionsOpen = !this.optionsOpen;
  }
}
