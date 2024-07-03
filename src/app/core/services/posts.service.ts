import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {


  post:any
  url=Constant.API_ENDPOINT
  public subject:BehaviorSubject<Post[]>=new BehaviorSubject<Post[]>([])

  constructor(private http:HttpClient) { }
  
  public count(){
    this.post=this.http.get(`${this.url}/postCount`);
    return this.post
  }
  public index(){
    this.post=this.http.get(`${this.url}/${Constant.POSTS}`).pipe(shareReplay(1)).subscribe({
      next:(data:any)=>this.subject.next(data),
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation') 
    }).add(console.log('suject permession'))
 
  }
  get postData():Observable<Post[]>{
    return this.subject.asObservable()
  }

  public store(data:any):Observable<Post>{
  this.post=this.http.post(`${this.url}/${Constant.POSTS}`,data);
  return this.post
  }

  public update(id:any,data:any):Observable<Post>{
    this.post=this.http.put(`${this.url}/${Constant.POSTS}/${id}`,data);
    return this.post
  }
   
  public delete(id:number):Observable<Post>{
    this.post=this.http.delete(`${this.url}/${Constant.POSTS}/${id}`);
    return this.post
  }
  public addpost(data:any,id:number){

    this.post=this.http.post(`${this.url}/${Constant.POSTS}/${id}/posts`,data);

    return this.post

  }
}
