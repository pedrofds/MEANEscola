import { Funcionario } from "./../../shared/funcionario";
import { ApiService } from "./../../shared/api.service";
import { Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-funcionarios-list",
  templateUrl: "./funcionarios-list.component.html",
  styleUrls: ["./funcionarios-list.component.css"]
})
export class FuncionariosListComponent implements OnInit {
  FuncionarioData: any = [];
  dataSource: MatTableDataSource<Funcionario>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "_id",
    "funcionario_name",
    "funcionario_email",
    "cargo",
    "action"
  ];

  constructor(private funcionarioApi: ApiService) {
    this.funcionarioApi.GetFuncionarios().subscribe(data => {
      this.FuncionarioData = data;
      console.log(data);
      this.dataSource = new MatTableDataSource<Funcionario>(
        this.FuncionarioData
      );
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngOnInit() {}

  deleteFuncionario(index: number, e) {
    if (window.confirm("Gostaria de excluir o registro")) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.funcionarioApi.DeleteFuncionario(e._id).subscribe();
    }
  }
}
