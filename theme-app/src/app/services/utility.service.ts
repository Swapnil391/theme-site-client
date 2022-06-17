import { Injectable } from '@angular/core';
import * as uuid from "uuid";

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor() { }

  generateUUID(){
    var newuuid : any = uuid.v4();
    return newuuid;
  }
}
