import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';

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
}
