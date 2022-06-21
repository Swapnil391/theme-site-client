import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-standard-dialog',
  templateUrl: './standard-dialog.component.html',
  styleUrls: ['./standard-dialog.component.scss']
})
export class StandardDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
