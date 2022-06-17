import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  toolbarTabs = [];
  header: any = {};
  loggedInUser: any;
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
      userid: _self.loggedInUser.userid
    }
    this.httpService.sendReq(null, '/api/updateuserbyid', params, function (data:any, err:any) {
      if(err){
        console.log(err);
      }else{
        _self._router.navigate(["account"], { replaceUrl: true,queryParams:{uid:_self.loggedInUser.userid}});
      }
    });
  }
}
