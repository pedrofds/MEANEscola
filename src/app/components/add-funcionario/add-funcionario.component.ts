import { Router } from "@angular/router";
import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { ApiService } from "../../shared/api.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Telefone {
  name: string;
}

@Component({
  selector: "app-add-funcionario",
  templateUrl: "./add-funcionario.component.html",
  styleUrls: ["./add-funcionario.component.css"]
})
export class AddFuncionarioComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild("chipList", { static: true }) chipList;
  @ViewChild("resetFuncionarioForm", { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  funcionarioForm: FormGroup;
  numeroTelefone: Telefone[] = [];
  CargoinArray: any = [
    "RH",
    "ANALISTA DE SISTEMAS",
    "DESENVOLVEDOR SR",
    "PRESIDÊNCIA",
    "FAXINEIRA"
  ];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private funcionarioApi: ApiService
  ) {}

  /* Reactive book form */
  submitBookForm() {
    this.funcionarioForm = this.fb.group({
      funcionario_name: ["", [Validators.required]],
      funcionario_email: ["", [Validators.required]],
      cargo: ["", [Validators.required]],
      numeroTelefone: [this.numeroTelefone],
      aniversario: ["", [Validators.required]],
      senha: ["", [Validators.required]],
      genero: ["Masculino"]
    });
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || "").trim() && this.numeroTelefone.length < 5) {
      this.numeroTelefone.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  /* Remove dynamic languages */
  remove(subject: Telefone): void {
    const index = this.numeroTelefone.indexOf(subject);
    if (index >= 0) {
      this.numeroTelefone.splice(index, 1);
    }
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.funcionarioForm.get("aniversario").setValue(convertDate, {
      onlyself: true
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.funcionarioForm.controls[controlName].hasError(errorName);
  };

  /* Submit book */
  submitFuncionarioForm() {
    if (this.funcionarioForm.valid) {
      this.funcionarioApi
        .AddFuncionario(this.funcionarioForm.value)
        .subscribe(res => {
          this.ngZone.run(() =>
            this.router.navigateByUrl("/funcionarios-list")
          );
        });
    }
  }
}
