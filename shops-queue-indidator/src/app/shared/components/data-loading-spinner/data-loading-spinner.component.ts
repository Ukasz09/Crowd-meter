import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-loading-spinner',
  templateUrl: './data-loading-spinner.component.html',
  styleUrls: ['./data-loading-spinner.component.scss'],
})
export class DataLoadingSpinnerComponent implements OnInit {
  @Input() text = 'Data loading';

  constructor() {}

  ngOnInit(): void {}
}
