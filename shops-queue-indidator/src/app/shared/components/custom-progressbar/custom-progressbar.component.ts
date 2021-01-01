import { Component, Input, OnInit } from '@angular/core';
import { max } from 'rxjs/operators';

@Component({
  selector: 'app-custom-progressbar',
  templateUrl: './custom-progressbar.component.html',
  styleUrls: ['./custom-progressbar.component.scss'],
})
export class CustomProgressbarComponent implements OnInit {
  static readonly LOW_CROWDING_THRESHOLD = 25;
  static readonly MEDIOCRE_CROWDING_THRESHOLD = 50;
  static readonly HIGH_CROWDING_THRESHOLD = 75;

  @Input() actualValue = 0;
  @Input() maxValue = 100;

  get actualProgressbarValue(): number {
    return this.actualValue <= this.maxValue ? this.actualValue : this.maxValue;
  }

  constructor() {}

  ngOnInit(): void {}

  get type(): string {
    const percent = (this.actualValue / this.maxValue) * 100;
    if (percent <= CustomProgressbarComponent.LOW_CROWDING_THRESHOLD) {
      return 'success';
    }
    if (percent <= CustomProgressbarComponent.MEDIOCRE_CROWDING_THRESHOLD) {
      return 'info';
    }
    if (percent <= CustomProgressbarComponent.HIGH_CROWDING_THRESHOLD) {
      return 'warning';
    }
    return 'danger';
  }
}
