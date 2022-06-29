import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StandardDialogComponent } from 'src/app/components/standard-dialog/standard-dialog.component';
import { HttpService } from 'src/app/services/http-service.service';
import { UtilityService } from 'src/app/services/utility.service';
import * as moment from 'moment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  fileServerSource:any='http://localhost:5000/';
  toolbarTabs = [{label:'Home',link:"/home"}]
  header : any = {};
  userDetails:any;
  loggedInUser: any;
  isSameUser: any;
  moment = moment;
  constructor(private router: Router,private httpService:HttpService,private route: ActivatedRoute,public utilityService:UtilityService) { }

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
        _self.utilityService.openSnackBar('Some error occured');
      }else if(data.data){
        _self.userDetails = data.data;
        try {
          _self.userDetails.details.socialmedia = data.data.details.socialmedia?JSON.parse(data.data.details.socialmedia):{};
        } catch (error) {}
      }
    });
  }

  createNewProject(){
    this.router.navigate(['/createproject'],{replaceUrl: true});
  }

  openProject(project:any){
    this.router.navigate(['/viewproject'],{replaceUrl: true,queryParams:{pid:project.projectid}});
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

  deleteProject(project:any){
    let _self = this;
    _self.utilityService.deleteproject({userid:project.userid,projectid:project.projectid},function(){
      _self.getData(_self.header.userid);
    });
  }

}



// facebook: (?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?

// instagram: /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/igm

// github: /^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/i