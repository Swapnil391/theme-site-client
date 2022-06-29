import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { HttpService } from 'src/app/services/http-service.service';
import { UtilityService } from 'src/app/services/utility.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { StandardDialogComponent } from 'src/app/components/standard-dialog/standard-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  fileServerSource:any='http://localhost:5000/';
  toolbarTabs : any = []
  loggedInUser : any;
  header:any={};
  filter:any={};
  searchText:any;
  constructor(private router: Router,private httpService:HttpService,public utilityService:UtilityService) { }

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
    if (_self.loggedInUser && _self.loggedInUser.userid) {
      _self.toolbarTabs.push({label:'Account',link:"/account",queryParams:{uid:_self.loggedInUser.userid}});
    }else{
      _self.toolbarTabs.push({label:'Login/Sign-Up',link:"/login"});
    }
    _self.getData();
  }

  getData(){
    var _self = this;
    var params = {
      filter:{
        username:_self.searchText,
        title:_self.searchText
      }
    }
    _self.header.projectlist = [];
    _self.header.userlist = [];
    this.httpService.sendReq(null, '/api/getfilteredprojects', params, function (data:any, err:any) {
      if(err){
        _self.utilityService.openSnackBar('Some error occured');
        return;
      }else if(data.data){
        _self.header.projectlist = data.data;
      } 
      _self.httpService.sendReq(null, '/api/getusersbyname', params, function (data1:any, err:any) {
        if(err){
          _self.utilityService.openSnackBar('Some error occured');
        }else if(data1.data){
          _self.header.userlist = data1.data;
        }
      });
    });
    console.log(_self.header);
    
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

  openUser(user:any){
    let _self=this;
    this.router.navigate(['/account'],{replaceUrl: true,queryParams:{uid:user.userid}});
  }

}
