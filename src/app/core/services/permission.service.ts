import { Injectable } from '@angular/core';
import { Permission } from './../models/Permission';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constant } from '../Constant';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  permission:any
  url=Constant.API_ENDPOINT
  constructor(private http:HttpClient) { }
  
  public index():Observable<Permission>{
   this.permission=this.http.get(`${this.url}/${Constant.PERMISSION}`);
   return this.permission
  }

  public store(data:any):Observable<Permission>{
    this.permission=this.http.post(`${this.url}/${Constant.PERMISSION}`,data);
    return this.permission
  }
  public update(id:any):Observable<Permission>{
    this.permission=this.http.put(`${this.url}/${Constant.PERMISSION}`,id);
    return this.permission
  }

  public delete(id:any):Observable<Permission>{
    this.permission=this.http.delete(`${this.url}/${Constant.PERMISSION}`);
    return this.permission
  }
  
}
