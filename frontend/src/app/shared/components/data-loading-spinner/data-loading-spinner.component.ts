import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-loading-spinner',
  templateUrl: './data-loading-spinner.component.html',
  styleUrls: ['./data-loading-spinner.component.scss'],
})
export class DataLoadingSpinnerComponent implements OnInit {
  @Input() text = 'Data loading';
  @Input() spinnerSize = '4em';
  @Input() textSize = '1em';
  @Input() textBold = false;
  @Input() textColor = 'black';

  constructor() {}

  ngOnInit(): void {}
}
