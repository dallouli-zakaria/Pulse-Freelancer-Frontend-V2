import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { Client } from '../models/Client';
import { BehaviorSubject, Observable, Subject, shareReplay } from 'rxjs';
import { PaginatedResponse } from '../models/PaginatedResponse';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  //variables
  client!:any;
  private dataSubject:BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  url=Constant.API_ENDPOINT
  //constauctor injection
  constructor(private http:HttpClient) {}

   //get all data form index and get by id
    getData$=this.dataSubject.asObservable()

  //counte function 
   public count():Observable<Client>{
   this.client=this.http.get(`${this.url}/${Constant.CLIENTCOUNT}`);
   return this.client;
  }

  //index geting all data from database
  public index(){
    this.client=this.http.get<Client[]>(`${this.url}/${Constant.CLIENTS}`).pipe(shareReplay(1)).subscribe({
       next: (data:any) =>  this.dataSubject.next(data),
       error:( error) => console.error(error),
       complete:()=>console.log('complet')})
       .add(()=>{console.log('subject')})
    } 


   // add function
    public store(data:any) {
      this.client=this.http.post(`${this.url}/${Constant.CLIENTS}`,data)
     return this.client
    }


   //sersh function 
     searchClient(searchTerm: string): Observable<Client[]> {
      let params = new HttpParams().set('query', searchTerm);
      return this.http.get<Client[]>(`${this.url}/clientsearchBar`, { params });
    }

    //pagination function 
    fetchPaginatedClient(page: number = 1): Observable<PaginatedResponse<Client>> {
     const params = new HttpParams().set('page', page.toString());
     return this.http.get<PaginatedResponse<Client>>(`${this.url}/clientPagination`, { params });
    }

     //update function
    public update(id:any,data:Partial<Client>): Observable<Client> {
      this.client=this.http.put<Client>(`${this.url}/${Constant.CLIENTS}/${id}`,data)
     return this.client
    }
    //delete function
    public deleted(id:any):Observable<Client>{
      this.client=this.http.delete(`${this.url}/${Constant.CLIENTS}/${id}`);
      return this.client
    }

    //get client by id
    show(id:number){
      this.client=this.http.get<Client>(`${this.url}/${Constant.CLIENTS}/${id}`).pipe(shareReplay(1)).subscribe({
        next: (data:any) =>  this.dataSubject.next(data),
        error:( error) => console.error(error),
        complete:()=>console.log('complet')})
        .add(()=>{console.log(' client by id')})
    }

    //inscription function auth
    register(data:any): Observable<any> {
      return this.http.post(`${this.url}/${Constant.CLIENTS}`, data);
    }

}
