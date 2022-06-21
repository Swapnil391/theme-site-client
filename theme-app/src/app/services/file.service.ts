import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpService:HttpService) { }

  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {


      var myfilename = '';
      Array.from(fileInput.target.files).forEach((file:any) => {
        console.log(file);
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
    _self.httpService.sendReq("http://localhost:5000", '/file/uploadfile', formData, function (data1:any, err1:any) {
      if(err1){
        console.log(err1);
        callback(err1);
      }else{
        callback(null,data1)
      }
    });
  }
}
