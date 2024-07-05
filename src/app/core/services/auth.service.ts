import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private http = inject(HttpClient);
  private router = inject(Router);
  private loggedUser?: string;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private isAuthenticated: boolean = false;
  
  public verifrole!:any;


  API_URL2: any = 'http://127.0.0.1:8000/api/auth';
  tokenn!: any;
  userid!:any;
  constructor() {}

  login(user: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.API_URL2}/login`, user)
      .pipe(
        tap((tokens: any) =>
          this.doLoginUser(user.email, JSON.stringify(tokens))
        )
      );
  }

  private doLoginUser(email: string, token: any) {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }
  private storeJwtToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }
  decodeToken(token: any): any {
    try {
      console.log( jwtDecode(token));
      return jwtDecode(token);
      
      
    } catch (Error) {
      return null;
    }
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ): Observable<any> {

    // return this.http.post(this.API_URL + 'signup', {
    return this.http.post(this.API_URL2 + '/register', {
      name,
      email,
      password,
      password_confirmation,
    });
  }

  parseID() {
    this.tokenn = localStorage.getItem('JWT_TOKEN');
    const data = JSON.parse(this.tokenn);
    const atoken = data.access_token;
    let deco = this.decodeToken(atoken);
    let sub = deco.sub;
    //const userId= atoken.id;
    return sub;
  }

  logout() {
    // return this.http.post(API_URL + 'signout', {});
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }


  

  getUser():Observable<any> {
    return this.http.get<any>(`${this.API_URL2}/user`);
  }


  getuserdetails(userid:any):Observable<any>{
    return this.http.get<any>(`${this.API_URL2}/user/${userid}`);
  }


  hasClientRole(): boolean {
    const token = this.JWT_TOKEN;
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      // Assuming roles are stored in 'roles' claim
      return tokenPayload && tokenPayload.roles && tokenPayload.roles.includes('clientx_role');
    }
    return false;
  }

  




}
