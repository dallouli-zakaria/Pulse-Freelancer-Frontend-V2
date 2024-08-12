import { Injectable } from '@angular/core';
import { Permission } from './../models/Permission';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, shareReplay } from 'rxjs';
import { Constant } from '../Constant';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  permission:any
  url=Constant.API_ENDPOINT
  public subject:BehaviorSubject<Permission[]>=new BehaviorSubject<Permission[]>([])
  constructor(private http:HttpClient) { }
 
  // Get all permissions
  public index() {
    // HTTP GET request to fetch all permissions
    this.http.get(`${this.url}/${Constant.PERMISSION}`).pipe(shareReplay(1)).subscribe({
      next: (data: any) => this.subject.next(data),  
      error: (error: any) => console.log(error), 
      complete: () => console.log('end operation') 
    }).add(console.log('subject permission'));  
  }

  // Observable to allow other components to subscribe to the permission data
  get permissionData(): Observable<Permission[]> {
    return this.subject.asObservable();
  }

  // Create a new permission
  public store(data: any): Observable<Permission> {
    this.permission = this.http.post<Permission>(`${this.url}/${Constant.PERMISSION}`, data);
    return this.permission;  
  }

  // Update a permission by ID
  public update(id: any, data: any): Observable<Permission[]> {   
    this.permission = this.http.put<Permission[]>(`${this.url}/${Constant.PERMISSION}/${id}`, data);
    return this.permission; 
  }
  // Delete a permission by ID
  public delete(id: any): Observable<Permission> {
    this.permission = this.http.delete<Permission>(`${this.url}/${Constant.PERMISSION}/${id}`);
    return this.permission; 
  }

  // Grant roles and permissions to users
  public grantRolesAndPermissions(roleName: string, permissions: string[],
     users: number[]): Observable<any> {
    const requestBody = {
      name: roleName,
      permission: permissions,
      users: users
    };
    return this.http.post<any>(`${this.url}/grantRolesAndPermissions`, requestBody);
  }

  // Grant a role to users
  public grantRoleToUser(roleName: string, users: number[]): Observable<any> {
    const requestBody = {
      name: roleName,
      users: users
    };
    // HTTP POST request to grant a role to users
    return this.http.post<any>(`${this.url}/grantRoleToUser`, requestBody);
  }
}
