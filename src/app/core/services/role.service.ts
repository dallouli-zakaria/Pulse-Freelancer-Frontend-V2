import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Role } from '../models/Role';
import { Constant } from '../Constant';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private userRoles: string[] = []; 

  constructor(private http:HttpClient) { }
  
  public subject :BehaviorSubject<Role[]>=new BehaviorSubject<Role[]>([]);
 url=Constant.API_ENDPOINT
 role:any
  
  // Get all roles
  public index() {
    // HTTP GET request to fetch all roles
    this.http.get(`${this.url}/${Constant.ROLE}`).pipe(shareReplay(1)).subscribe({
      next: (data: any) => this.subject.next(data), 
      error: (error: any) => console.log(error), 
      complete: () => console.log() 
    }).add(console.log('subject of roles'));  
  }

  // Observable to allow other components to subscribe to the role data
  get RoleData(): Observable<Role[]> {
    return this.subject.asObservable();
  }

  // Create a new role
  public store(data: any): Observable<Role[]> {
    return this.http.post<Role[]>(`${this.url}/${Constant.ROLE}`, data); 
  }

  // Update a role by ID
  public updated(id: number, data: any): Observable<Role[]> {
    return this.http.put<Role[]>(`${this.url}/${Constant.ROLE}/${id}`, data); 
  }

  // Delete a role by ID
  public deleted(id: number): Observable<Role[]> {
    return this.http.delete<Role[]>(`${this.url}/${Constant.ROLE}/${id}`);  
  }

  // Get user roles by user ID
  getUserRoles(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/user/${id}/roles`); 
  }

  // Set user roles in the local variable
  setUserRoles(roles: string[]) {
    this.userRoles = roles; 
  }

  // Get user roles from the local cache
  getUserRolesFromCache(): string[] {
    return this.userRoles;  
  }

  // Grant a role to a user
  grantRoleToUser(data: any) {
    return this.http.post<any>(`${this.url}/grantRoleToUser`, data); 
  }

  // Get roles by role name
  getRoles(rolename: string) {
    return this.http.get<any>(`${this.url}/users/role/${rolename}`); 
  }

  // Grant permission to a role
  public grantPermessionToRole(permessionName: any) {
    return this.http.post<any>(`${this.url}/grantPermissionsToRole`, permessionName);  
  }

}
