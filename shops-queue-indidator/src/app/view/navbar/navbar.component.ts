import { Component, Input, OnInit } from '@angular/core';
import { PlaceCategory } from 'src/app/model/place-category';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  readonly LOGO_IMG_PATH = 'assets/images/logo.png';
  @Input() categories: PlaceCategory[];

  constructor() {}

  ngOnInit(): void {}
}
