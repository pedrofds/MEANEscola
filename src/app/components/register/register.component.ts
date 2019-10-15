import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../shared/api.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private funcionarioApi: ApiService
  ) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      funcionario_name: ["", Validators.required],
      funcionario_email: ["", Validators.required],
      senha: ["", Validators.required]
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.registroForm.controls[controlName].hasError(errorName);
  };

  submitRegistroForm() {
    if (this.registroForm.valid) {
      console.log(1);
      this.funcionarioApi
        .RegistrarFuncionario(this.registroForm.value)
        .subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl("/login"));
        });
    }
  }
}
