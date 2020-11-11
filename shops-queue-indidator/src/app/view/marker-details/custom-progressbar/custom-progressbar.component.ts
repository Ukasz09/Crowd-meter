import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-progressbar',
  templateUrl: './custom-progressbar.component.html',
  styleUrls: ['./custom-progressbar.component.scss'],
})
export class CustomProgressbarComponent implements OnInit {
  @Input() actualValue = 0;
  @Input() maxValue = 100;

  constructor() {}

  ngOnInit(): void {}

  get type(): string {
    let perc = (this.actualValue / this.maxValue) * 100;
    if (perc < 25) return 'success';
    if (perc < 50) return 'info';
    if (perc < 75) return 'warning';
    return 'danger';
  }
}
