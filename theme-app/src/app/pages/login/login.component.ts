import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hideNav = true;
  isuser: any;
  showotp: any;
  firstFormGroup: any;
  secondFormGroup: any;
  verifiedOtp: any;
  registerDetails: any = {};
  loginDetails: any = {};
  constructor(private _formBuilder: FormBuilder,private httpService:HttpService,private _router:Router,private utilityService:UtilityService) { 
    this.firstFormGroup= FormGroup;
    this.secondFormGroup= FormGroup;
  }
  

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      otp: ['', Validators.required]
    });
  }

  register(){
    var _self = this;
    var params = {
      username: this.firstFormGroup.get('username').value?this.firstFormGroup.get('username').value:null,
      password: this.firstFormGroup.get('password').value?this.firstFormGroup.get('password').value:null,
      emailid:this.secondFormGroup.get('email').value?this.secondFormGroup.get('email').value:null
    }
    this.utilityService.openLoader();
    this.httpService.sendReq(null, '/api/register', params, function (data:any, err:any) {
      _self.utilityService.closeLoader();
      if(err){
        _self.utilityService.openSnackBar('Some error occured');
      }else if(data.data){
        localStorage.setItem("userdetails",JSON.stringify(data.data) );
        _self._router.navigate(["home"], { replaceUrl: true });
      }
    });
  }

  login(){
    var _self = this;
    var params = {
      username: _self.loginDetails.username,
      password: _self.loginDetails.password
    }
    this.utilityService.openLoader();
    this.httpService.sendReq(null, '/api/login', params, function (data:any, err:any) {
      _self.utilityService.closeLoader();
      if(err){
        _self.utilityService.openSnackBar('Some error occured');
      }else if(data.error){
        _self.utilityService.openSnackBar('Some error occured');
      }else if(data.data){
        localStorage.setItem("userdetails",JSON.stringify(data.data) );
        // var userInfo = localStorage.getItem("userdetails");
        // console.log(userInfo);
        
        _self._router.navigate(["home"], { replaceUrl: true });
      }
    });
  }

  sendOtp(){
    var _self = this;
    var data = {
      emailid:this.secondFormGroup.get('email').value?this.secondFormGroup.get('email').value:null
    };
    this.utilityService.openLoader();
    this.httpService.sendReq(null, '/api/sendOtp', data, function (data:any, err:any) {
      _self.utilityService.closeLoader();
      _self.showotp =true;
      return;
    });
  }

  verifyOtp(){
    var _self = this;
    var data = {
      emailid:this.secondFormGroup.get('email').value?this.secondFormGroup.get('email').value:null,
      otp:this.secondFormGroup.get('otp').value?this.secondFormGroup.get('otp').value:null
    };
    this.utilityService.openLoader();
    this.httpService.sendReq(null, '/api/verifyotp', data, function (res:any, err:any) {
      _self.utilityService.closeLoader();
      if(res && res.data){
        _self.verifiedOtp = true;
      }
      return;
    });
  }

}
