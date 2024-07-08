import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { UserIndexComponent } from './../../components/user/user-index/user-index.component';
import { Observable } from 'rxjs';
import { Offer } from '../models/Offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
 offer:any
 url=Constant.API_ENDPOINT
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

  public update(id:any):Observable<Offer>{
    this.offer=this.http.put(`${this.url}/${Constant.OFFERS}`,id);
    return this.offer
  }
   
  public delete():Observable<Offer>{
    this.offer=this.http.delete(`${this.url}/${Constant.OFFERS}`);
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

  
}
