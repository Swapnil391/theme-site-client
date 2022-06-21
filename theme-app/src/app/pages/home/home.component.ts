import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  toolbarTabs : any = []
  loggedInUser : any;
  constructor() { }

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
  }

}
