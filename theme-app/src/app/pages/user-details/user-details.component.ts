import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service.service';
import { __classPrivateFieldSet } from 'tslib';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  toolbarTabs = [];
  header: any = {};
  loggedInUser: any;
  profileImg:any;
  profileChanged: boolean=false;
  constructor(private httpService:HttpService,private _router:Router) { }

  ngOnInit(): void {
    let _self = this;
    _self.init();
  }

  init(){
    var _self = this;
    try {
      _self.loggedInUser = localStorage.getItem("userdetails");
      _self.loggedInUser = JSON.parse(_self.loggedInUser);
    } catch (error) {
      console.log(error);
    }
    _self.getData(_self.loggedInUser.userid)
  }

  getData(userid:any){
    var _self = this;
    var params = {
      userid: userid
    }
    this.httpService.sendReq(null, '/api/getuserbyid', params, function (data:any, err:any) {
      if(err){
        console.log(err);
      }else if(data.data){
        _self.header.username = data.data.username;
        _self.header.profession = data.data.details.profession;
        _self.header.description = data.data.details.description;
        _self.header.skills = data.data.details.skills;
        _self.header.socialmedia = {};
        try {
          _self.header.socialmedia = data.data.details.socialmedia?JSON.parse(data.data.details.socialmedia):{};
        } catch (error) {}
      }
    });
  }

  updateUserById(){
    var _self = this;
        var params = {
          username : _self.header.username,
          profession : _self.header.profession,
          description : _self.header.description,
          skills : _self.header.skills,
          userid: _self.loggedInUser.userid,
          socialmedia:_self.header.socialmedia?JSON.stringify(_self.header.socialmedia):null,
        }
        
          _self.httpService.sendReq(null, '/api/updateuserbyid', params, function (data:any, err:any) {
            if(err){
              console.log(err);
            }else{
              _self._router.navigate(["account"], { replaceUrl: true,queryParams:{uid:_self.loggedInUser.userid}});
            }
          });   
  }

  cancel(){
    let _self=this;
    _self._router.navigate(["account"], { replaceUrl: true,queryParams:{uid:_self.loggedInUser.userid}});
  }

  getUploadedFiles(event:any){
    let _self = this;
    this.profileImg = event.data;
    this.profileChanged = true;
    var params = {
      userid: _self.loggedInUser.userid,
      profilefilename:this.profileImg.uploadedFiles[0].serverFileName
    }
    
      _self.httpService.sendReq(null, '/api/updateprofileimgbyid', params, function (data:any, err:any) {
        if(err){
          console.log(err);
        }else{
          _self._router.navigate(["account"], { replaceUrl: true,queryParams:{uid:_self.loggedInUser.userid}});
        }
      });   
  }
}
