import { Injectable } from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  APP_URL :any= "http://localhost:3000";

  constructor(private http : HttpClient) { }
  private handleError(error: any) {
    console.log(error);
    return throwError("Unable to connect to server. Please try after sometime.");
  }

  private postReq(appUrl: any, path: any, obj: any, callback: any) {

    let _self = this;
    this.http.post(appUrl + path, obj).pipe(map(function (res: any) {
      return res;
    }),catchError(this.handleError)).subscribe(
      data => callback(data, null),
      error => callback(null, error)
    );
  }


  private getReq(appUrl: any, path: any, callback: any,options?:any) {
    let _self = this;
    this.http.get(appUrl + path,options).pipe(map(function (res: any) {
      console.log(res);
      return res;
    }), catchError(this.handleError)).subscribe(
      data => {if(data){
        console.log(data);
      };
      callback(data, null)},
      error =>{console.log(error);
        callback(null, error)}
    );   
  }

  sendReq(appUrl: any, path: any, obj: any, callback: any,options?: any) {
    if (!appUrl) {
      appUrl = this.APP_URL;
    }

    if (obj) {
      obj.server_key = 'd4ebfe7a-cfbc-4b3d-99f7-d331ec245d66';
      this.postReq(appUrl, path, obj, callback);
    } else {
      this.getReq(appUrl, path, callback,options);
    }
  }
}
