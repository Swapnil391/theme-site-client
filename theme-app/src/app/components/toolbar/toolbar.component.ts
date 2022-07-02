import { Component, Input, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {
  @Input() tabs: any;
  isMobileDevice:any;
  constructor() { }

  ngOnInit(): void {
  }

  checkDevice(){
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    this.isMobileDevice = regexp.test(details);
  }
}
