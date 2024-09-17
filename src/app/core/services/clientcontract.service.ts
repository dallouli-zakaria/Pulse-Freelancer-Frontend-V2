import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constant } from '../Constant';
import { Contract } from '../models/Contract';
import { PaginatedResponse } from '../models/PaginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class ClientcontractService {

//variables
contract:any
url=Constant.API_ENDPOINT
public subject:BehaviorSubject<any[]>=new BehaviorSubject<any[]>([]);
//injection by constructor
 constructor(private http:HttpClient) { }
//subject variables 
 contractData$=this.subject.asObservable();
// counte function
 public count(){
   this.contract=this.http.get(`${this.url}/contractCount`);
   return this.contract;
 }
 
//get data from index function using event subject behavior 
 public index():Observable<any>{
  this.contract=this.http.get<any[]>(`${this.url}/${Constant.CLIENTCONTRACTS}`);
   return this.contract;
   
 } 
 
 // pagination contract
  public fetchPaginatedContracts(page: number = 1): Observable<PaginatedResponse<Contract>> {
   const params = new HttpParams().set('page', page.toString());
   return this.http.get<PaginatedResponse<Contract>>(`${this.url}/contractPagination`, { params });
   }
  // get contracts by id
  public store(data:any):Observable<Contract>{
  this.contract=this.http.post(`${this.url}/${Constant.CLIENTCONTRACTS}`,data)
  return this.contract
 }
 //update function
  public update(id:number,data:any):Observable<Contract>{
    this.contract=this.http.put(`${this.url}/${Constant.CLIENTCONTRACTS}/${id}`,data);
    return this.contract
   }

 //deleted function
  public delete(id:any):Observable<Contract> {
   this.contract=this.http.delete(`${this.url}/${Constant.CLIENTCONTRACTS}/${id}`);
   return this.contract
  }



}
