import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {


  post:any
  url=Constant.API_ENDPOINT
  constructor(private http:HttpClient) { }
  
  public count(){
    this.post=this.http.get(`${this.url}/offerCount`);
    return this.post
  }
  public index():Observable<Post>{
    this.post=this.http.get(`${this.url}/${Constant.POSTS}`);
    return this.post
  }

  public store(data:any):Observable<Post>{
  this.post=this.http.post(`${this.url}/${Constant.POSTS}`,data);
  return this.post
  }

  public update(id:any):Observable<Post>{
    this.post=this.http.put(`${this.url}/${Constant.POSTS}`,id);
    return this.post
  }
   
  public delete():Observable<Post>{
    this.post=this.http.delete(`${this.url}/${Constant.POSTS}`);
    return this.post
  }
}
