import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isuser: any;
  firstFormGroup: any;
  secondFormGroup: any;
  constructor(private _formBuilder: FormBuilder) { 
    this.firstFormGroup= FormGroup;
    this.secondFormGroup= FormGroup;
  }
  

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

}
