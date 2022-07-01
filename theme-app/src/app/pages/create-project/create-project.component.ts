import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  toolbarTabs = [];
  header:any={};
  loggedInUser:any;
  cancelDisabled:any;
  this=this;
  constructor(private _router:Router,private route: ActivatedRoute,private utilityService:UtilityService,private httpService:HttpService) { }

  ngOnInit(): void {
    let _self=this;
    _self.route.queryParams
      .subscribe(params => {
        _self.header.projectid = params['pid']?params['pid']:null;
        _self.init()
      }
    );
  }

  init(){
    var _self = this;
    try {
      _self.loggedInUser = localStorage.getItem("userdetails");
      _self.loggedInUser = JSON.parse(_self.loggedInUser);
    } catch (error) {
      console.log(error);
    }
    _self.header.uploadedImgUrls=[];
    _self.header.uploadedProjectUrls=[];
    _self.header.uploadedThumbnailUrls=[];
    _self.getData(function(){})
  }

  getData(callback:any){
    let _self = this;
    var params = {
      projectid:_self.header.projectid,
      userid: _self.loggedInUser.userid
    }
    this.utilityService.openLoader();
    _self.httpService.sendReq(null, '/api/getprojectbyid', params, function (data:any, err:any) {
    _self.utilityService.closeLoader();
      if(err){
        _self.utilityService.openSnackBar('Some error occured');
      }else{
        _self.header.title = data.data.title;
        _self.header.description = data.data.description;
        _self.header.demolink = data.data.demo;
        _self.header.createdat = data.data.createdat;
        _self.header.uploadedProjectUrls = data.data.projectfilename?[{link:data.data.projectfilename}]:[];
        _self.header.uploadedThumbnailUrls = data.data.thumbnailfilename?[{link:data.data.thumbnailfilename}]:[];
        try {
          data.data.images = JSON.parse(data.data.images);
        } catch (error) {}
        if(data.data.images && data.data.images && data.data.images.images.length>0){
          data.data.images.images.forEach((image:any) => {
            _self.header.uploadedImgUrls.push({link:image})
          });
        }
      }
      callback();
    }); 
  }

  saveProject(){
    var _self = this;
        var params : any = {
          title : _self.header.title,
          description : _self.header.description,
          demo :_self.header.demolink,
          userid: _self.loggedInUser.userid,
          projectid: _self.header.projectid,
          createdat:_self.header.createdat ? _self.header.createdat : new Date().getTime()
        }
        
        if(_self.header.uploadedProjectUrls && _self.header.uploadedProjectUrls.length > 0){
          params.projectfilename = _self.header.uploadedProjectUrls[0].link ? _self.header.uploadedProjectUrls[0].link : '';
        }else{
          params.projectfilename = '';
        }
        if(_self.header.uploadedThumbnailUrls && _self.header.uploadedThumbnailUrls.length > 0){
          params.thumbnailfilename = _self.header.uploadedThumbnailUrls[0].link ? _self.header.uploadedThumbnailUrls[0].link : '';
        }else{
          params.thumbnailfilename = '';
        }

        if(_self.header.uploadedImgUrls && _self.header.uploadedImgUrls.length > 0){
          var obj : any = {images : []};
          _self.header.uploadedImgUrls.forEach((image:any) => {
            if(image && image.link){
              obj.images.push(image.link);
            }
          });
          params.images = JSON.stringify(obj);
        }else{
          params.images = '';
        }
        this.utilityService.openLoader();
        _self.httpService.sendReq(null, '/api/saveproject', params, function (data:any, err:any) {
          _self.utilityService.closeLoader();
          if(err){
            _self.utilityService.openSnackBar('Some error occured');
          }else{
            _self._router.navigate(["account"], { replaceUrl: true,queryParams:{uid:_self.loggedInUser.userid}});
          }
        });   
  }

  cancel(){
    let _self=this;
    _self._router.navigate(["account"], { replaceUrl: true,queryParams:{uid:_self.loggedInUser.userid}});
  }

  getUploadedImages(event:any){
    var images = event.data;
    this.cancelDisabled = true;
    images.uploadedFiles.forEach((element:any) => {
      this.header.uploadedImgUrls.push({link:element.serverFileName});
    });
  }

  removeDeletedImages(event:any){
    var images = event;
    this.cancelDisabled = true;
    this.header.uploadedImgUrls = [];
    images.uploadedFiles.forEach((element:any) => {
      this.header.uploadedImgUrls.push({link:element.serverFileName});
    });
  }

  getUploadedProjectFile(event:any){
    var files = event.data;
    this.cancelDisabled = true;
    files.uploadedFiles.forEach((element:any) => {
      this.header.uploadedProjectUrls = [{link:element.serverFileName}];
    });
  }

  removeDeletedProjectFile(event:any){
    var files = event;
    this.cancelDisabled = true;
    this.header.uploadedProjectUrls = [];
    files.uploadedFiles.forEach((element:any) => {
      this.header.uploadedProjectUrls.push({link:element.serverFileName});
    });
  }

  getUploadedThumnail(event:any){
    var thumbnail = event.data;
    this.cancelDisabled = true;
    thumbnail.uploadedFiles.forEach((element:any) => {
      this.header.uploadedThumbnailUrls = [{link:element.serverFileName}];
    });
  }

  removeDeletedThumnail(event:any){
    var thumbnail = event;
    this.cancelDisabled = true;
    this.header.uploadedThumbnailUrls = [];
    thumbnail.uploadedFiles.forEach((element:any) => {
      this.header.uploadedThumbnailUrls.push({link:element.serverFileName});
    });
  }

}
