import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Constant } from '../Constant';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { PaginatedResponse } from '../models/PaginatedResponse';


@Injectable({
  providedIn: 'root'
})
export class UserService { 
  private user: any;
  // The base URL for the API endpoint
  private url = Constant.API_ENDPOINT;  
 // BehaviorSubject to store and emit User array
  private subjectBe: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]); 
  
  // Observable to allow other components to subscribe to the user data
  getdata$=this.subjectBe.asObservable();
  constructor(private http: HttpClient) { }

  // Get all users
  index() {
    this.user = this.http.get(`${this.url}/${Constant.USER}`).pipe(shareReplay(1)).subscribe({
      next: (data: any) => this.subjectBe.next(data),  
      error: (error) => { console.log(error); },  
      complete: () => console.log('end operation of subject show')  
    }).add(() => console.log("user subject"));
  }

  // Fetch paginated users
  fetchPaginatedUser(page: number = 1) {
    const params = new HttpParams().set('page', page.toString());  // Set the page number as a query parameter

    this.http.get<PaginatedResponse<User>>(`${this.url}/userPagination`, { params }).pipe(shareReplay(1)).subscribe({
      next: (data: any) => this.subjectBe.next(data),  
      error: (error) => { console.log(error); },  
      complete: () => console.log('end operation of subject show')
    }).add(() => console.log("user subject"));
  }

  // Create a new user
  store(userdata: any): Observable<User[]> {
    this.user = this.http.post<User[]>(`${this.url}/${Constant.USER}`, userdata);
    return this.user;
  }

  // Update a user by ID
  update(id: number, userdata: any): Observable<User[]> {
    this.user = this.http.put<User[]>(`${this.url}/${Constant.USER}/${id}`, userdata);
    return this.user;
  }

  // Delete a user by ID
  delete(id: number): Observable<User> {
    this.user = this.http.delete<User>(`${this.url}/${Constant.USER}/${id}`);
    return this.user;
  }

  // Get a user by ID
  show(id: number) {
    this.user = this.http.get<User>(`${this.url}/${Constant.USER}/${id}`).pipe(shareReplay(1)).subscribe({
      next: (data: any) => this.subjectBe.next(data), 
      error: (error) => { console.log(error); },  
      complete: () => console.log('end operation of subject show')
    }).add(() => console.log("user subject"));
  }

  // Get users with a specific role
  public getUserWithRole(roleName: any) {
    return this.http.get(`${this.url}/users/role/${roleName}`);
  }

  // Grant permissions to a user
  public grantPermessionToUSer(permessionName: any) {
    return this.http.post<any>(`${this.url}/grantPermissionsToUser`, permessionName);
  }
}
