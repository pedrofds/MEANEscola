import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})

export class LogOutComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private funcionarioApi: ApiService
  ) { }

  ngOnInit() {
    // reset login status
    this.funcionarioApi.logout();

  }
  
    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
      return this.loginForm.controls[controlName].hasError(errorName);
    }  

}
