import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service.service';
import { UtilityService } from 'src/app/services/utility.service';
import * as moment from 'moment';
import { StandardDialogComponent } from 'src/app/components/standard-dialog/standard-dialog.component';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {
  fileServerSource:any='http://localhost:5000/';
  toolbarTabs : any = [{label:'Home',link:"/home"}]
  header : any = {};
  userDetails:any;
  loggedInUser: any;
  isSameUser: any;
  moment = moment;
  constructor(private _router:Router,private route: ActivatedRoute,public utilityService:UtilityService,private httpService:HttpService) { }

  ngOnInit(): void {
    let _self=this;
    try {
      _self.loggedInUser = localStorage.getItem("userdetails");
      _self.loggedInUser = JSON.parse(_self.loggedInUser);
    } catch (error) {
      console.log(error);
    }
    _self.route.queryParams
      .subscribe(params => {
        _self.header.projectid = params['pid']?params['pid']:null;
        _self.init()
      }
    );
  }

  init(){
    let _self=this;
    if (_self.loggedInUser && _self.loggedInUser.userid) {
      _self.toolbarTabs.push({label:'Account',link:"/account",queryParams:{uid:_self.loggedInUser.userid}});
    }
    if (_self.header && _self.header.projectid) {
      _self.header.uploadedImgUrls=[];
      _self.header.uploadedProjectUrls=[];
      _self.header.uploadedThumbnailUrls=[];
      _self.getData(function(){})
    }
  }

  getData(callback:any){
    let _self = this;
    var params = {
      projectid:_self.header.projectid,
    }
    _self.httpService.sendReq(null, '/api/getprojectbyid', params, function (data:any, err:any) {
      if(err){
        _self.utilityService.openSnackBar('Some error occured');
      }else{
        _self.header.title = data.data.title;
        _self.header.description = data.data.description;
        _self.header.demolink = data.data.demo;
        _self.header.createdat = data.data.createdat;
        _self.header.uploadedProjectUrls = data.data.projectfilename?[{link:data.data.projectfilename}]:[];
        _self.header.uploadedThumbnailUrls = data.data.thumbnailfilename?[{link:data.data.thumbnailfilename}]:[];
        _self.header.username = data.data.username;
        _self.header.profilefilename = data.data.profilefilename;
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

  shareProject(project:any){
    let _self=this;
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;
    const fullUrl = `${protocol}://${domain}:${port? port : ""}/viewproject?pid=${project.projectid}`
    var params={
      header:"Share Link",
      link:fullUrl,
      content:[
        {
          type:'input',
          disabled:true,
          label:'Link',
          value:window.location.href,
          style:""
        }
      ],
      showOk:true,
      showCancel:true,
      okLabel:'Copy',
      cancelLabel:'Cancel'
    }
    _self.utilityService.openDialog(StandardDialogComponent,params,function (err:any,res:any) {
      if(res && res.link){
        navigator.clipboard.writeText(res.link);
      }
    })
  }

}
