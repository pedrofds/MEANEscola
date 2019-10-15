import { Injectable } from "@angular/core";
import { Estudante } from "./Estudante";
import { Funcionario } from "./Funcionario";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  endpoint: string = "http://localhost:8000";
  //endpoint: string = 'api';
  //headers = new HttpHeaders().set('Content-Type', 'application/json');
  token =
    JSON.parse(localStorage.getItem("funcionariologado")) != null
      ? JSON.parse(localStorage.getItem("funcionariologado"))["token"]
      : "";

  headers = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "Bearer " + this.token
  });

  constructor(private http: HttpClient) {}

  // Add Estudante
  AddEstudante(data: Estudante): Observable<any> {
    let API_URL = `${this.endpoint}/estudante`;
    /*
    var funcionarioLogado = JSON.parse(
      localStorage.getItem("funcionariologado")
    );
    if (funcionarioLogado != null) {
      var headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + funcionarioLogado["token"]
      });
    }
    */
    return this.http
      .post(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Get all Estudantes
  GetEstudantes() {
    let API_URL = `${this.endpoint}/estudante`;
    return this.http.get(`${this.endpoint}/estudante`, {
      headers: this.headers
    });
  }

  // Get Estudante
  GetEstudante(id): Observable<any> {
    let API_URL = `${this.endpoint}/estudante/${id}`;

    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update Estudante
  UpdateEstudante(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/estudante/${id}`;

    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete estudante
  DeleteEstudante(id): Observable<any> {
    var API_URL = `${this.endpoint}/estudante/${id}`;

    return this.http
      .delete(API_URL, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  /* **************************************************** */
  /* ******************** FUNCIONARIO *********************/
  /* **************************************************** */
  //Registrar funcionario
  RegistrarFuncionario(data: Funcionario): Observable<any> {
    console.log(0);

    let API_URL = `${this.endpoint}/funcionario/registrar`;
    console.log(API_URL);

    return this.http
      .post(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Add funcionario
  AddFuncionario(data: Funcionario): Observable<any> {
    console.log(0);

    let API_URL = `${this.endpoint}/funcionario`;

    return this.http
      .post(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Get all funcionarios
  GetFuncionarios() {
    return this.http.get(`${this.endpoint}/funcionario`, {
      headers: this.headers
    });
  }

  // Get funcionario
  GetFuncionario(id): Observable<any> {
    let API_URL = `${this.endpoint}/funcionario/${id}`;

    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update funcionario
  UpdateFuncionario(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/funcionario/${id}`;

    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete funcionario
  DeleteFuncionario(id): Observable<any> {
    var API_URL = `${this.endpoint}/funcionario/${id}`;

    return this.http
      .delete(API_URL, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Login funcionario
  LoginFuncionario(data: Funcionario): Observable<any> {
    console.log(0);
    let API_URL = `${this.endpoint}/funcionario/login`;
    return this.http.post(API_URL, data).pipe(
      map(data => {
        //login sucessfull
        localStorage.setItem("funcionariologado", JSON.stringify(data));
        //console.log(localStorage.getItem('funcionariologado'))
      })
      //catchError(this.errorMgmt)
    );
  }

  logout() {
    localStorage.clear();
    localStorage.removeItem("funcionariologado");
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
