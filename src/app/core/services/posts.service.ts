import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Post } from '../models/post';
import { Client } from '../models/Client';
import { PaginatedResponse } from '../models/PaginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  
  post:any
  url=Constant.API_ENDPOINT
  public subject:BehaviorSubject<Post[]>=new BehaviorSubject<Post[]>([])
  // Observable to allow other components to subscribe to the post data

  constructor(private http:HttpClient) { }
   // Get the count of posts
  
  public count(){
    this.post =this.http.get(`${this.url}/postCount`);
    return this.post ;
   }
  // Get all posts
  public index() {
    // HTTP GET request to fetch all posts
   return  this.http.get(`${this.url}/${Constant.POSTS}`)
  }


  // Fetch paginated posts
  public fetchPaginatedPosts(page: number = 1){
    const params = new HttpParams().set('page', page.toString());

    this.post = this.http.get<PaginatedResponse<Post>>(`${this.url}/postPagination`, { params });
    return this.post
  }

  // Create a new post
  public store(data: any): Observable<Post> {
    this.post = this.http.post<Post>(`${this.url}/${Constant.POSTS}`, data);
    return this.post;  // Return the newly created post as an observable
  }

  // Update a post by ID
  public update(id: any, data: any): Observable<Post> {
    this.post = this.http.put<Post>(`${this.url}/${Constant.POSTS}/${id}`, data);
    return this.post;  // Return the updated post as an observable
  }

  // Delete a post by ID
  public delete(id: number): Observable<Post> {
    this.post = this.http.delete<Post>(`${this.url}/${Constant.POSTS}/${id}`);
    return this.post;  // Return the deleted post as an observable
  }

  // Add a post to another post by ID
  public addpost(data: any, id: number): Observable<Post> {
    this.post = this.http.post<Post>(`${this.url}/${Constant.POSTS}/${id}/posts`, data);
    return this.post;  // Return the added post as an observable
  }

  // Show a post by ID
  public show(id: any){
    this.post = this.http.get<Post>(`${this.url}/${Constant.POSTS}/${id}`);
    return this.post
  }

  // Show posts by client ID
  public showbclient(id: any){
    this.post = this.http.get<Post[]>(`${this.url}/${Constant.POSTS}/client/${id}`)
    return this.post
  }

  // Show posts by post ID
  public showbpost(id: any){
    this.post = this.http.get<Post>(`${this.url}/${Constant.POSTS}/post_id/${id}`)
    return this.post
  }

  // Check if a freelancer has made an offer on a post
  public checkFreelancerOffer(postId: number, freelancerId: number): Observable<{ offer_exists: boolean }> {
    const url = `${this.url}/posts/${postId}/freelancers/${freelancerId}/offer`;
    return this.http.get<{ offer_exists: boolean }>(url);  // Return if an offer exists as an observable
  }

  // Get freelancers by post ID
  public getFreelancersByPostId(postId: number){
    const url = `${this.url}/offer/freelancers/${postId}`;
    this.post = this.http.get<any>(url)
    return this.post
  }

  // Get client details by post ID
  public getClientDetailsByPostId(postId: number) {
    return this.http.get<Client>(`${this.url}/posts/${postId}/client`)

  }

  // Check if an offer exists for a post by ID
 public checkIfOfferExists(postId: number) {
    const url = `${this.url}/posts/${postId}/check-offer`;
   return this.http.get<boolean>(url)
  }

  // Get closed posts by freelancer ID
  public getClosedPostsByFreelancerId(freelancerId: number){
    this.post = this.http.get<any>(`${this.url}/posts/closed-by-freelancer/${freelancerId}`)
    return this.post
  }

  // Show posts by freelancer ID
  public showbfreelancer(id: any){
    this.post = this.http.get<Post[]>(`${this.url}/${Constant.POSTS}/freelancer/${id}`);
    return this.post
  }

  // Show open posts
  public showOpenPosts(){
    this.post = this.http.get<any>(`${this.url}/${Constant.POSTS}/open/all`);
    return this.post
  }



  verifyClientPost(id:number,postid:number){
    return this.http.get(`${this.url}/verify-client-post/${id}/${postid}`);
  }

  verifyFreelancerPost(id:number,postid:number){
    return this.http.get(`${this.url}/verify-freelancer-post/${id}/${postid}`);
  }

}
