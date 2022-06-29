import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as uuid from "uuid";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  dialogRef: any;
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  generateUUID() {
    var newuuid: any = uuid.v4();
    return newuuid;
  }

  openDialog(dialogComponent: any, params: any, callback: any) {
    this.dialogRef = this.dialog.open(dialogComponent, {
      data: params
    });

    this.dialogRef.afterClosed().subscribe((result: any) => {
      callback(null, result);
    });
  }

  openSnackBar(message: string, action?: string) {
    if (!action) {
      action = 'Ok';
    }
    this._snackBar.open(message, action);
  }

  getHumanizedDuration(timestamp: any) {
    var period = (new Date().getTime()) - timestamp;
    let parts = [];
    const duration = moment.duration(period);
    // return nothing when the duration is falsy or not correctly parsed (P0D) 
    if (!duration || duration.toISOString() === "P0D") 
      return; 
    if (duration.years() >= 1) {
      const years = Math.floor(duration.years());
      parts.push(years + " " + (years > 1 ? "years" : "year"));
    } 
    if (duration.months() >= 1) {
      const months = Math.floor(duration.months());
      parts.push(months + " " + (months > 1 ? "months" : "month"));
    } 
    if
      (duration.days() >= 1) {
      const days = Math.floor(duration.days());
      parts.push(days + " " + (days > 1 ? "days" : "day"));
    }
    if (duration.hours() >= 1) {
      const hours = Math.floor(duration.hours());
      parts.push(hours + " " + (hours > 1 ? "hours" : "hour"));
    }
    if (duration.minutes() >= 1) {
      const minutes = Math.floor(duration.minutes());
      parts.push(minutes + " " + (minutes > 1 ? "minutes" : "minute"));
    }
    if (duration.seconds() >= 1) {
      const seconds = Math.floor(duration.seconds());
      parts.push(seconds + " " + (seconds > 1 ? "seconds" : "second"));
    }

    var finalStr = parts[0];
    if(parts.length > 1){
      finalStr +=  ", " + parts[1];
    }
    return finalStr ;
  }
}
