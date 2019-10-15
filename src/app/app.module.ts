import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

/* Angular 8 components */
import { AddEstudanteComponent } from "./components/add-estudante/add-estudante.component";
import { EditEstudanteComponent } from "./components/edit-estudante/edit-estudante.component";
import { EstudantesListComponent } from "./components/estudantes-list/estudantes-list.component";

import { AddFuncionarioComponent } from "./components/add-funcionario/add-funcionario.component";
import { EditFuncionarioComponent } from "./components/edit-funcionario/edit-funcionario.component";
import { FuncionariosListComponent } from "./components/funcionarios-list/funcionarios-list.component";
import { LogInComponent } from "./components/log-in/log-in.component";
import { LogOutComponent } from "./components/log-out/log-out.component";
import { RegisterComponent } from "./components/register/register.component";

/* Angular material */
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from "./material.module";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

/* Angular 8 http service */
import { HttpClientModule } from "@angular/common/http";

/* Angular 8 CRUD services */
import { ApiService } from "./shared/api.service";

/* Reactive form services in Angular 8 */
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    AddEstudanteComponent,
    EditEstudanteComponent,
    EstudantesListComponent,
    AddFuncionarioComponent,
    EditFuncionarioComponent,
    FuncionariosListComponent,
    LogInComponent,
    LogOutComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
