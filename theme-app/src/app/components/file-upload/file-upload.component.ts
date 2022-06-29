import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  fileServerSource:any='http://localhost:5000/';
  @Input() params:any;
  selectedFileName:any;
  selectedFile:any;
  filesToUpload:any;
  markedCount:any=0;
  @Output() uploads = new EventEmitter()
  @Output() delets = new EventEmitter()
  count:any = 1;
  constructor(private fileService:FileService,private utilityService:UtilityService) { }

  ngOnInit(): void {
    if(!this.params.limit){
      this.params.limit = 1;
    }
    this.count += this.params.uploadedfiles.length;
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
    if(!this.params.limit){
      this.params.limit = 1;
    }
    if(this.count > this.params.limit){
      this.utilityService.openSnackBar(`You can't add more than ${(this.count-1)} files`,'Ok');
      this.selectedFile = null;
      this.selectedFileName = null;
      return;
    }
    if(this.params.accept && !this.params.accept.includes(this.selectedFile.type)){
      this.utilityService.openSnackBar(`Invalid File Selected`,'Ok')
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
    if(!this.params.limit){
      this.params.limit = 1;
    }
    if(this.filesToUpload && this.filesToUpload.length > 0 && _self.params.uploadedfiles.length < _self.params.limit){
      this.fileService.uploadFile(this.filesToUpload,function(err:any,res:any){
        if(err){
          console.log(err);
          _self.utilityService.openSnackBar('Some error occured');
          return;
        }
        console.log(res);
        _self.filesToUpload = [];
        _self.selectedFile = null;
        _self.selectedFileName = null;
        _self.count=1;
        _self.uploads.emit(res);
        if(_self.params.uploadedfiles && _self.params.uploadedfiles.length > 0){
          _self.count += _self.params.uploadedfiles.length;
        }
      });
    }else{
      _self.filesToUpload = [];
      this.selectedFile = null;
      this.selectedFileName = null;
      this.count --;
      _self.utilityService.openSnackBar('Cannot Upload');
    }
  }

  imgClick(img:any){
    if(img.selected){
      img.selected = false;
      this.markedCount --;
    }else{
      img.selected = true;
      this.markedCount ++;
    }
  }

  deleteSelected(){
    var filesToDelete:any = [];
    var filesNotDeleted:any = [];
    this.params.uploadedfiles.forEach((file:any) => {
      if(file && file.selected){
        filesToDelete.push(file.link);
      }else{
        filesNotDeleted.push(file.link);
      }
    });

    let _self = this;
    if(filesToDelete && filesToDelete.length > 0){
      this.fileService.deleteFile(filesToDelete,function(err:any,res:any){
        if(err){
          console.log(err);
          _self.utilityService.openSnackBar('Some error occured');
          return;
        }
        // _self.count=1;
        var temparr = filesNotDeleted.map( (file:any) => {
          return {serverFileName:file};
        });
        var obj = {
          uploadedFiles:temparr
        }
        _self.delets.emit(obj);
        _self.count -= filesToDelete.length;
        _self.markedCount -= filesToDelete.length;
      });
    }else{
      _self.utilityService.openSnackBar('Cannot Delete');
      
    }
  }

}
