import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isuser: any;
  showotp: any;
  firstFormGroup: any;
  secondFormGroup: any;
  verifiedOtp: any;
  registerDetails: any = {};
  loginDetails: any = {};
  constructor(private _formBuilder: FormBuilder,private httpService:HttpService) { 
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
    this.httpService.sendReq(null, '/api/register', {username:'swapnil'}, function (data:any, err:any) {
      return;
    });
  }

  sendOtp(){
    var _self = this;
    var data = {
      emailid:this.secondFormGroup.get('email').value?this.secondFormGroup.get('email').value:null
    };
    this.httpService.sendReq(null, '/api/sendOtp', data, function (data:any, err:any) {
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
    this.httpService.sendReq(null, '/api/verifyotp', data, function (res:any, err:any) {
      if(res && res.data){
        _self.verifiedOtp = true;
      }
      return;//[(ngModel)]="registerDetails.password"
    });
  }

}
