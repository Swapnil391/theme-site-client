import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() params:any;
  selectedFileName:any;
  selectedFile:any;
  filesToUpload:any;
  @Output() uploads = new EventEmitter()
  count:any = 1;
  constructor(private fileService:FileService) { }

  ngOnInit(): void {
    if(!this.params.limit){
      this.params.limit = 1;
    }
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
        this.selectedFile = file;
        this.selectedFileName = this.selectedFile.name
        // const formData = new FormData();
        // formData.append("thumbnail", file);
    }
  }

  onFileAdd(){
    if(this.count > this.params.limit){
      console.log(`You can't add more than ${this.count} files`);
      this.selectedFile = null;
      this.selectedFileName = null;
      return;
    }
    if(!this.filesToUpload){
      this.filesToUpload=[];
    }
    if(this.selectedFile){
      this.filesToUpload.push(this.selectedFile);
      this.selectedFile = null;
      this.selectedFileName = null;
      this.count ++;
    }
  }

  removeFile(index:any){
    if (this.filesToUpload.length > 1) {
      this.filesToUpload = this.filesToUpload.splice(index, 1);
    }else if(index == 0){
      this.filesToUpload = [];
    } 
    this.selectedFile = null;
    this.selectedFileName = null;
    this.count --;
  }

  upload(){
    let _self = this;
    if(this.filesToUpload && this.filesToUpload.length > 0){
      this.fileService.uploadFile(this.filesToUpload,function(err:any,res:any){
        if(err){
          console.log(err);
          return;
        }
        console.log(res);
        _self.filesToUpload = [];
        _self.selectedFile = null;
        _self.selectedFileName = null;
        _self.count=1;
        _self.uploads.emit(res)
      });
    }else{
      console.log('Cannot Upload');
      
    }
  }

}
