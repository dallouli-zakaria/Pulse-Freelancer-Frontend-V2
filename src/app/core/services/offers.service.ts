import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { Observable } from 'rxjs';
import { Offer } from '../models/Offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
 offer:any
 url=Constant.API_ENDPOINT
 freelancer!:any;
 
  constructor(private http:HttpClient) { }
  
  public count(){
    this.offer=this.http.get(`${this.url}/offerCount`);
    return this.offer
  }
  public index():Observable<Offer>{
    this.offer=this.http.get(`${this.url}/${Constant.OFFERS}`);
    return this.offer
  }

  public store(data:any):Observable<Offer>{
  this.offer=this.http.post(`${this.url}/${Constant.OFFERS}`,data);
  return this.offer
  }

  public update(id: any, value: any):Observable<Offer>{
    this.offer=this.http.put(`${this.url}/${Constant.OFFERS}/${id}`,value);
    return this.offer
  }
   
  public delete(id:number):Observable<Offer>{
    this.offer=this.http.delete(`${this.url}/${Constant.OFFERS}/${id}`);
    return this.offer
  }
  public show(id:any):Observable<Offer>{
    this.offer=this.http.get(`${this.url}/${Constant.OFFERS}/${id}`);
    return this.offer
  }


  public showbyfreelancerid(id:any):Observable<Offer>{
    this.offer=this.http.get(`${this.url}/${Constant.OFFERS}/freelancer/${id}`);
    return this.offer;
  }

  getOffersByPostAndFreelancer(postId: number, freelancerId: number): Observable<Offer>{
    this.offer=this.http.get<Offer>(`${this.url}/offers/${postId}/${freelancerId}`);
    return  this.offer;
  }


  getFreelancerDetailsByPostIdTrue(postId: number): Observable<any>{
    this.freelancer=this.http.get<any>(`${this.url}/offer/freelancerTrue/${postId}`);
    return  this.freelancer;
  }

  getFreelancerDetailsByPostIdFalse(postId: number): Observable<any>{
    this.freelancer=this.http.get<any>(`${this.url}/offer/freelancerFalse/${postId}`);
    return  this.freelancer;
  }








  
}
