import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { StandardDialogComponent } from '../standard-dialog/standard-dialog.component';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})


export class ProfileCardComponent implements OnInit {
  fileServerSource:any='http://localhost:5000/';
  @Input() userDetails: any;
  loggedInUser: any;
  header: any;
  isSameUser: any;
  constructor(private router: Router,private utilityService:UtilityService) { }

  ngOnInit(): void {
    let _self=this;
    try {
      _self.loggedInUser = localStorage.getItem("userdetails");
      _self.loggedInUser = JSON.parse(_self.loggedInUser);
    } catch (error) {
      console.log(error);
    }
    if (_self.loggedInUser && _self.loggedInUser.userid && _self.userDetails.userid && _self.loggedInUser.userid==_self.userDetails.userid) {
      _self.isSameUser=true;
    }else{
      _self.isSameUser=false;
    }
  }
  logout(){
    localStorage.removeItem("userdetails");
    this.router.navigate(['/'],{replaceUrl: true});
  }

  shareProfile(){
    let _self=this;
    var params={
      header:"Share Link",
      link:window.location.href,
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

  public ngOnDestroy() {
    
  }
}
