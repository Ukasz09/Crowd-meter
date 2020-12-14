import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-progressbar',
  templateUrl: './custom-progressbar.component.html',
  styleUrls: ['./custom-progressbar.component.scss'],
})
export class CustomProgressbarComponent implements OnInit {
  static readonly LOW_CROWDING_TRESHOLD = 25;
  static readonly MEDIOCRE_CROWDING_TRESHOLD = 50;
  static readonly HIGH_CROWDING_TRESHOLD = 75;

  @Input() actualValue = 0;
  @Input() maxValue = 100;

  constructor() {}

  ngOnInit(): void {}

  get type(): string {
    let perc = (this.actualValue / this.maxValue) * 100;
    if (perc <= CustomProgressbarComponent.LOW_CROWDING_TRESHOLD)
      return 'success';
    if (perc <= CustomProgressbarComponent.MEDIOCRE_CROWDING_TRESHOLD)
      return 'info';
    if (perc <= CustomProgressbarComponent.HIGH_CROWDING_TRESHOLD)
      return 'warning';
    return 'danger';
  }
}
