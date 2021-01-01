import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-response-page-absolute',
  templateUrl: './error-response-page-absolute.component.html',
  styleUrls: ['./error-response-page-absolute.component.scss'],
})
export class ErrorResponsePageAbsoluteComponent implements OnInit {
  @Input() errorCode: number;
  @Input() errorText: string;

  constructor() {}

  ngOnInit(): void {}
}
