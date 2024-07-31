import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Constant } from '../Constant';
import { WishList } from '../models/wish-list';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishListService {



  freelancer!:any;
  post:any
  url=Constant.API_ENDPOINT
  public subject:BehaviorSubject<WishList[]>=new BehaviorSubject<WishList[]>([])
  wishlist$=this.subject.asObservable()

  constructor(private http:HttpClient) { }


  getFavoriteFreelancersdetails(id:number){
    this.freelancer=this.http.get<any>(`${this.url}/wishlist/client/${id}/freelancers`).pipe(shareReplay(1)).subscribe({
      next:(data:any)=>this.subject.next(data),
      error:(error)=>{console.log(error) },
      complete:()=>console.log('end operation of subject show')
    }).add(()=>console.log("user subject"))
 }

  getFavoriteFreelancers(id:number): Observable<any> {
     this.freelancer=this.http.get<any>(`${this.url}/wishlist/client/${id}`);
     return this.freelancer;
  }

  addToWishlist(client_id: number,freelancer_id:number): Observable<any> {
    return this.http.get<any>(`${this.url}/wishlist/add/${client_id}/${freelancer_id}`);
  }

  removeFromWishlist(client_id: number,freelancer_id:number): Observable<any> {
    return this.http.delete<any>(`${this.url}/wishlist/remove/${client_id}/${freelancer_id}`);
  }
}
