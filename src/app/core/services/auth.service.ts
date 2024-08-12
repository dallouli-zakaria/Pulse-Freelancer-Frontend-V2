import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, retry, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Constant } from './../Constant';
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
  isLoading: boolean = true;
  role!: string;
  roles!: string[];


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
   data:any
  ): Observable<any> {

    // return this.http.post(this.API_URL + 'signup', {
    return this.http.post(this.API_URL2 + '/register', {
     data
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

  getUserRole(): Observable<string> {
    return new Observable(observer => {
      if (this.isLoggedIn()) {
        let sub = this.parseID();
        this.getuserdetails(sub).subscribe(
          (res: any) => {
            this.roles = res.roles;
            this.isLoading = false;
            if (res.roles.includes('client_role')) {
              this.role = 'Client';
            } else if (res.roles.includes('freelancer_role')) {
              this.role = 'Freelancer';
            } else {
              this.role = 'superadmin_role'; 
            }
            observer.next(this.role);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('User is not logged in');
      }
    });
  }


  verifyEmail(id: number, hash: string): Observable<any> {
    return this.http.get(`http://localhost:8000/api/email/verify/${id}/${hash}`);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${Constant.API_ENDPOINT}/reset-password`, data);
  }

  forgetPassword(data:any): Observable<any> {
    return this.http.post(`${Constant.API_ENDPOINT}/forgot-password`, data);
  }


}