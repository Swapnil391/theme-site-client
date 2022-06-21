import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StandardDialogComponent } from 'src/app/components/standard-dialog/standard-dialog.component';
import { HttpService } from 'src/app/services/http-service.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  toolbarTabs = [{label:'Home',link:"/home"}]
  header : any = {};
  userDetails:any;
  loggedInUser: any;
  isSameUser: any;
  constructor(private httpService:HttpService,private route: ActivatedRoute,private utilityService:UtilityService) { }

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
        console.log(params); 
        _self.header.userid = params['uid'];
        if (_self.loggedInUser && _self.loggedInUser.userid && _self.header.userid && _self.loggedInUser.userid==_self.header.userid) {
          _self.isSameUser=true;
        }else{
          _self.isSameUser=false;
        }
      }
    );
    _self.init()
  }

  init(){
    let _self=this;
    if (_self.header && _self.header.userid) {
      _self.getData(_self.header.userid);
    }
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
        _self.userDetails = data.data;
        try {
          _self.userDetails.details.socialmedia = data.data.details.socialmedia?JSON.parse(data.data.details.socialmedia):{};
        } catch (error) {}
      }
    });
  }

}


// facebook: (?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?

// instagram: /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/igm

// github: /^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/i