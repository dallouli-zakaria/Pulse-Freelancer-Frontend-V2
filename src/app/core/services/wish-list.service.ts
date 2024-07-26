import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constant } from '../Constant';
import { WishList } from '../models/wish-list';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishListService {




  post:any
  url=Constant.API_ENDPOINT
  public subject:BehaviorSubject<WishList[]>=new BehaviorSubject<WishList[]>([])

  constructor(private http:HttpClient) { }


  getFavoriteFreelancers(id:number): Observable<any> {
    return this.http.get<any>(`${this.url}/wishlist/client/${id}`);
  }

  addToWishlist(client_id: number,freelancer_id:number): Observable<any> {
    return this.http.get<any>(`${this.url}/wishlist/add/${client_id}/${freelancer_id}`);
  }

  removeFromWishlist(client_id: number,freelancer_id:number): Observable<any> {
    return this.http.delete<any>(`${this.url}/wishlist/remove/${client_id}/${freelancer_id}`);
  }
}
