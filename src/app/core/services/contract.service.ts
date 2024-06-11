import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
 contract:any
 url=Constant.API_ENDPOINT
  constructor(private http:HttpClient) { }
  public count(){
    this.contract=this.http.get(`${this.url}/contractCount`);
  return this.contract;
  }
}
