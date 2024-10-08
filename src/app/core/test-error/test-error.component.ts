import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent {

  baseUrl = environment.apiUrl;
  validationError:any;

  constructor(private http:HttpClient) {}

  getEror404(){
    return this.http.get<any>(this.baseUrl+'Buggy/notfound').subscribe({
      next:(response:any)=>{
        console.log(response)
      },
      error:(error:any)=>{
        console.log(error);
      }
    })
  }

  getEror500(){
    return this.http.get<any>(this.baseUrl+'Buggy/servererror').subscribe({
      next:(response:any)=>{
        console.log(response)
      },
      error:(error:any)=>{
        console.log(error);
      }
    })
  }

  getEror400(){
    return this.http.get<any>(this.baseUrl+'Buggy/badrequest').subscribe({
      next:(response:any)=>{
        console.log(response)
      },
      error:(error:any)=>{
        console.log(error);
      }
    })
  }

  getEror400Validation(){
    return this.http.get<any>(this.baseUrl+'Buggy/badrequest/aman-ansari').subscribe({
      next:(response:any)=>{
        console.log(response)
      },
      error:(error:any)=>{
        console.log(error);
        this.validationError = error.errors;
      }
    })
  }


}
