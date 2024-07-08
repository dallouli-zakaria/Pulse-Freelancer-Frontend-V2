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
  public index(){
   this.http.get(`${this.url}/${Constant.ROLE}`).pipe(shareReplay(1)).subscribe({
    next:(data:any)=>this.subject.next(data),
    error:(error:any)=>console.log(error),
    complete:()=>console.log()
 
   }).add(console.log('subject of roles'))
   
  }
  
  get RoleData():Observable<Role[]>{
    return this.subject.asObservable();
  }


  public store(data:any):Observable<Role[]>{
    return this.http.post<Role[]>(`${this.url}/${Constant.ROLE}`,data)
  }
  
  public updated(id:number,data:any):Observable<Role[]>{
   return this.http.put<Role[]>(`${this.url}/${Constant.ROLE}/${id}`,data)
  }

  public  deleted(id:number):Observable<Role[]>{
    return this.http.delete<Role[]>(`${this.url}/${Constant.ROLE}/${id}`)
  }


  
  getUserRoles(id:number): Observable<any> {
    return this.http.get<any>(`${this.url}/user/${id}/roles`);
  }

  setUserRoles(roles: string[]) {
    this.userRoles = roles;
  }

  getUserRolesFromCache(): string[] {
    return this.userRoles;
  }


  grantRoleToUser(){
    return this.http.get<any>(`${this.url}/grantRoleToUser`);
  }

  getRoles(rolename:string){
    return this.http.get<any>(`${this.url}/users/role/${rolename}`);
  }


}
