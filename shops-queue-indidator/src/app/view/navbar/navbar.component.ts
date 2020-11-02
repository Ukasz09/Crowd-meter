import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  logoImgPath = 'assets/images/logo.png';

  constructor() {}

  ngOnInit(): void {}
}
