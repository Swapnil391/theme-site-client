import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})


export class ProfileCardComponent implements OnInit {
@Input() userDetails: any;
  loggedInUser: any;
  header: any;
  isSameUser: any;
  constructor(private router: Router) { }

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
    this.router.navigate(['/']);
  }
  public ngOnDestroy() {
    
  }
}
