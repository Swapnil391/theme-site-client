import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  fileServerSource:any='http://localhost:5000';
  constructor(private httpService:HttpService,public utilityService:UtilityService) { }

  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {


      var myfilename = '';
      Array.from(fileInput.target.files).forEach((file:any) => {
        myfilename += file.name + ',';
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          // Return Base64 Data URL
          const imgBase64Path = e.target.result;
          console.log(imgBase64Path);
          
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    } else {
      myfilename = 'Select File';
    }
  }

  uploadFile(files:any,callback:any){
    var _self = this;
    var formData = new FormData();
    files.forEach((file:any) =>{
      formData.append("file", file);
    })
    this.utilityService.openLoader();
    _self.httpService.sendReq(_self.fileServerSource, '/file/uploadfile', formData, function (data1:any, err1:any) {
      _self.utilityService.closeLoader();
      if(err1){
        callback(err1);
      }else{
        callback(null,data1)
      }
    });
  }

  deleteFile(files:any,callback:any){
    var _self = this;
    this.utilityService.openLoader();
    _self.httpService.sendReq(_self.fileServerSource, '/file/deletefile', {filenames:files}, function (data1:any, err1:any) {
      _self.utilityService.closeLoader();
      if(err1){
        callback(err1);
      }else{
        callback(null,data1)
      }
    });
  }
}
