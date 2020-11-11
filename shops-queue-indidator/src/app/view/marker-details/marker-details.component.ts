import { Component, Input, OnInit } from '@angular/core';
import { MarkerDetailedModel } from 'src/app/model/marker';

@Component({
  selector: 'app-marker-details',
  templateUrl: './marker-details.component.html',
  styleUrls: ['./marker-details.component.scss'],
})
export class MarkerDetailsComponent implements OnInit {
  @Input() marker: MarkerDetailedModel;

  constructor() {}

  ngOnInit(): void {}
}
