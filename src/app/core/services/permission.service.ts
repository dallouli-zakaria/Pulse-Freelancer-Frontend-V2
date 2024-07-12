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
  
  public index(){
   this.http.get(`${this.url}/${Constant.PERMISSION}`).pipe(shareReplay(1)).subscribe({
     next:(data:any)=>this.subject.next(data),
     error:(error)=>console.log(error),
     complete:()=>console.log('end operation') 
   }).add(console.log('suject permession'))

  }
  get permessionData():Observable<Permission[]>{
      return this.subject.asObservable()
  }

  public store(data:any):Observable<Permission>{
    this.permission=this.http.post(`${this.url}/${Constant.PERMISSION}`,data);
    return this.permission
  }
  public update(id:any,data:any):Observable<Permission[]>{
    this.permission=this.http.put<Permission[]>(`${this.url}/${Constant.PERMISSION}/${id}`,data);
    return this.permission
  }

  public delete(id:any):Observable<Permission>{
    this.permission=this.http.delete(`${this.url}/${Constant.PERMISSION}/${id}`);
    return this.permission
  }

 public grantRolesAndPermissions(roleName: string, permissions: string[], users: number[]): Observable<any> {
    const requestBody = {
      name: roleName,
      permission: permissions,
      users: users
    };

    return this.http.post<any>(`${this.url}/grantRolesAndPermissions`, requestBody);
  }

  public grantRoleToUser(roleName: string, users: number[]): Observable<any> {
    const requestBody = {
      name: roleName,
      users: users
    };

    return this.http.post<any>(`${this.url}/grantRoleToUser`, requestBody);
  }
  
}
