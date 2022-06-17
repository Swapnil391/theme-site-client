import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

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
}
