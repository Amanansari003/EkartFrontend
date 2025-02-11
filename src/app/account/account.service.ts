import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/user'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currectUserSource = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currectUserSource.asObservable();
  constructor(private http: HttpClient, private router :Router) { }

  getCurrentUserValue(){
    return this.currectUserSource.value;
  }

  loadCurrentUser(token: string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`);
    return this.http.get<IUser>(this.baseUrl+'account',{headers}).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token',user.token);
          this.currectUserSource.next(user);
        }
      })
    )
  }

  login(values:any){
    return this.http.post<IUser>(this.baseUrl+'account/login',values).pipe(  
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token',user.token);
          this.currectUserSource.next(user);
        }
      })
    )
  }

  register(values:any){
    return this.http.post<IUser>(this.baseUrl+'account/register',values).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token',user.token);
          this.currectUserSource.next(user);
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.currectUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmail(emial:string){
    return this.http.get<boolean>(this.baseUrl+'/account/emailexists?email='+emial);
  }

}
