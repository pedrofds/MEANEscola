import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
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

    this.loginForm = this.fb.group({
      funcionario_email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }
  
    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
      return this.loginForm.controls[controlName].hasError(errorName);
    }  

  submitLoginForm() {
    if (this.loginForm.valid) {
      this.funcionarioApi.LoginFuncionario(this.loginForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/estudantes-list'))
      });
    }
  }


}
