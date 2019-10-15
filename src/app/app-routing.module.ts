import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddEstudanteComponent } from "./components/add-estudante/add-estudante.component";
import { EditEstudanteComponent } from "./components/edit-estudante/edit-estudante.component";
import { EstudantesListComponent } from "./components/estudantes-list/estudantes-list.component";
import { AddFuncionarioComponent } from "./components/add-funcionario/add-funcionario.component";
import { EditFuncionarioComponent } from "./components/edit-funcionario/edit-funcionario.component";
import { FuncionariosListComponent } from "./components/funcionarios-list/funcionarios-list.component";

import { LogInComponent } from "./components/log-in/log-in.component";
import { LogOutComponent } from "./components/log-out/log-out.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "add-estudante" },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LogInComponent },
  { path: "logout", component: LogOutComponent },
  { path: "add-estudante", component: AddEstudanteComponent },
  { path: "edit-estudante/:id", component: EditEstudanteComponent },
  { path: "estudantes-list", component: EstudantesListComponent },
  { path: "add-funcionario", component: AddFuncionarioComponent },
  { path: "edit-funcionario/:id", component: EditFuncionarioComponent },
  { path: "funcionarios-list", component: FuncionariosListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
