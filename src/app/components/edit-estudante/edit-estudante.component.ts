import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { ApiService } from "../../shared/api.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Sugestao {
  name: string;
}

@Component({
  selector: "app-edit-estudante",
  templateUrl: "./edit-estudante.component.html",
  styleUrls: ["./edit-estudante.component.css"]
})
export class EditEstudanteComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild("chipList", { static: true }) chipList;
  @ViewChild("resetEstudanteForm", { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  estudanteForm: FormGroup;
  sugestaoArray: Sugestao[] = [];
  SectioinArray: any = ["A", "B", "C", "D", "E"];

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private estudanteApi: ApiService
  ) {
    var id = this.actRoute.snapshot.paramMap.get("id");
    this.estudanteApi.GetEstudante(id).subscribe(data => {
      console.log(data.sugestao);
      this.sugestaoArray = data.sugestao;
      this.estudanteForm = this.fb.group({
        estudante_name: [data.estudante_name, [Validators.required]],
        estudante_email: [data.estudante_email, [Validators.required]],
        bloco: [data.bloco, [Validators.required]],
        sugestao: [data.sugestao],
        aniversario: [data.aniversario, [Validators.required]],
        genero: [data.genero]
      });
    });
  }

  /* Reactive book form */
  updateBookForm() {
    this.estudanteForm = this.fb.group({
      estudante_name: ["", [Validators.required]],
      estudante_email: ["", [Validators.required]],
      bloco: ["", [Validators.required]],
      sugestao: [this.sugestaoArray],
      aniversario: ["", [Validators.required]],
      genero: ["Masculino"]
    });
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || "").trim() && this.sugestaoArray.length < 5) {
      this.sugestaoArray.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  /* Remove dynamic languages */
  remove(sugestao: Sugestao): void {
    const index = this.sugestaoArray.indexOf(sugestao);
    if (index >= 0) {
      this.sugestaoArray.splice(index, 1);
    }
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.estudanteForm.get("aniversario").setValue(convertDate, {
      onlyself: true
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.estudanteForm.controls[controlName].hasError(errorName);
  };

  /* Update book */
  updateEstudanteForm() {
    console.log(this.estudanteForm.value);
    var id = this.actRoute.snapshot.paramMap.get("id");
    if (window.confirm("Gostaria de alterar os dados?")) {
      this.estudanteApi
        .UpdateEstudante(id, this.estudanteForm.value)
        .subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl("/estudantes-list"));
        });
    }
  }
}
