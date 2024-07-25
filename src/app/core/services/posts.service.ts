import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Post } from '../models/post';
import { Client } from '../models/Client';

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
    return this.subject.asObservable();
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


  public show(id:any):Observable<Post>{
    this.post=this.http.get(`${this.url}/${Constant.POSTS}/${id}`);
    return this.post
  }

  public showbclient(id:any){
    this.post=this.http.get(`${this.url}/${Constant.POSTS}/client/${id}`);
    return this.post

  }

  public showbpost(id:any){
    this.post=this.http.get(`${this.url}/${Constant.POSTS}/post_id/${id}`);
    return this.post

  }

  checkFreelancerOffer(postId: number, freelancerId: number): Observable<{ offer_exists: boolean }> {
    const url = `${this.url}/posts/${postId}/freelancers/${freelancerId}/offer`;
    return this.http.get<{ offer_exists: boolean }>(url);
  }



    //Method to get freelancers by postId
    public getFreelancersByPostId(postId: number): Observable<any> {
      const url = `${this.url}/offer/freelancers/${postId}`;
      return this.http.get<any>(url);
    }

    getClientDetailsByPostId(postId: number): Observable<Client> {
      return this.http.get<Client>(`${this.url}/posts/${postId}/client`);
    }


    checkIfOfferExists(postId: number): Observable<boolean> {
      const url = `${this.url}/posts/${postId}/check-offer`;
      return this.http.get<boolean>(url);
    }


    getClosedPostsByFreelancerId(freelancerId: number): Observable<any> {
      this.post = this.http.get(`${this.url}/posts/closed-by-freelancer/${freelancerId}`);
      return this.post
    }
  








}
