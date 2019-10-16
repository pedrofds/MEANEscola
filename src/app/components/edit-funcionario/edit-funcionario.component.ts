import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from '../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Telefone {
  name: string;
}

@Component({
  selector: 'app-edit-funcionario',
  templateUrl: './edit-funcionario.component.html',
  styleUrls: ['./edit-funcionario.component.css']
})

export class EditFuncionarioComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetFuncionarioForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  funcionarioForm: FormGroup;
  numeroTelefone: Telefone[] = [];
  CargoinArray: any = ['RH', 'ANALISTA DE SISTEMAS', 'DESENVOLVEDOR SR', 'PRESIDÊNCIA', 'FAXINEIRA'];

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private funcionarioApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.funcionarioApi.GetFuncionario(id).subscribe(data => {
      console.log(data.sugestao)
      this.numeroTelefone = data.numeroTelefone;
      this.funcionarioForm = this.fb.group({
        funcionario_name: [data.funcionario_name, [Validators.required]],
        funcionario_email: [data.funcionario_email, [Validators.required]],
        cargo: [data.cargo, [Validators.required]],
        numeroTelefone: [data.numeroTelefone],
        aniversario: [data.aniversario, [Validators.required]],
        genero: [data.genero],
        senha: [data.senha]
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
    this.funcionarioForm = this.fb.group({
      funcionario_name: ['', [Validators.required]],
      funcionario_email: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      numeroTelefone: [this.numeroTelefone],
      aniversario: ['', [Validators.required]],
      senha:['', [Validators.required]],
      genero: ['Masculino']
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.numeroTelefone.length < 5) {
      this.numeroTelefone.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(sugestao: Telefone): void {
    const index = this.numeroTelefone.indexOf(sugestao);
    if (index >= 0) {
      this.numeroTelefone.splice(index, 1);
    }
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.funcionarioForm.get('aniversario').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.funcionarioForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateFuncionarioForm() {
    console.log(this.funcionarioForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Gostaria de alterar os dados?')) {
      this.funcionarioApi.UpdateFuncionario(id, this.funcionarioForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/funcionarios-list'))
      });
    }
  }
  
}
