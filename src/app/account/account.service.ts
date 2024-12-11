import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/user';
import { Router } from '@angular/router';
import { IAddress } from '../shared/models/address';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseURl = environment.apiUrl;
  private currectUserSource = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currectUserSource.asObservable();
  constructor(private http: HttpClient, private router :Router) { }

  getCurrentUserValue(){
    return this.currectUserSource.value;
  }

  loadCurrentUser(token: string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`);
    return this.http.get<IUser>(this.baseURl+'account',{headers}).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token',user.token);
          this.currectUserSource.next(user);
        }
      })
    )
  }

  login(values:any){
    return this.http.post<IUser>(this.baseURl+'account/login',values).pipe(  
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token',user.token);
          this.currectUserSource.next(user);
        }
      })
    )
  }

  register(values:any){
    return this.http.post<IUser>(this.baseURl+'account/register',values).pipe(
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

  checkEmailExists(emial:string){
    return this.http.get<boolean>(this.baseURl+'account/emailexists?email='+emial);
  }

  getUserAddress(): Observable<IAddress> {
    return this.http.get<IAddress>(this.baseURl + 'account/address');
  }

  updateUserAddress(address: IAddress): Observable<IAddress> {
    return this.http.put<IAddress>(this.baseURl + 'account/address', address);
  }

  isAdmin(token: string): boolean {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.role.indexOf('Admin') > -1) {
        return true;
      }
    }
    return false;
  }
}
