import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
 offer:any
  constructor(private http:HttpClient) { }

  public count(){
    this.offer=this.http.get("http://localhost:8000/api/offerCount");
    return this.offer
  }
}
