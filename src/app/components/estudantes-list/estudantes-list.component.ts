import { Estudante } from "./../../shared/estudante";
import { ApiService } from "./../../shared/api.service";
import { Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-estudantes-list",
  templateUrl: "./estudantes-list.component.html",
  styleUrls: ["./estudantes-list.component.css"]
})
export class EstudantesListComponent implements OnInit {
  EstudanteData: any = [];
  dataSource: MatTableDataSource<Estudante>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "estudante_name",
    "estudante_email",
    "bloco",
    "action"
  ];

  constructor(private estudanteApi: ApiService) {
    this.estudanteApi.GetEstudantes().subscribe(data => {
      this.EstudanteData = data;
      console.log(data);
      this.dataSource = new MatTableDataSource<Estudante>(this.EstudanteData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngOnInit() {}

  deleteEstudante(index: number, e) {
    if (window.confirm("Gostaria de excluir o registro")) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.estudanteApi.DeleteEstudante(e._id).subscribe();
    }
  }
}
