import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-response-page',
  templateUrl: './error-response-page.component.html',
  styleUrls: ['./error-response-page.component.scss'],
})
export class ErrorResponsePageComponent implements OnInit {
  @Input() errorCode: number;
  @Input() errorText: string;
  @Input() errorTextFontSize = '1.4em';
  @Input() errorCodeFontSize = '5em';

  constructor() {}

  ngOnInit(): void {}
}
