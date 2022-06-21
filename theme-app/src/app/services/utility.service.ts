import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as uuid from "uuid";

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  dialogRef: any;
  constructor(public dialog: MatDialog) { }

  generateUUID(){
    var newuuid : any = uuid.v4();
    return newuuid;
  }

  openDialog(dialogComponent: any,params: any,callback: any) {
    this.dialogRef = this.dialog.open(dialogComponent,{
      data:params
    });

    this.dialogRef.afterClosed().subscribe((result: any) => {
      callback(null,result);
    });
  }
}
