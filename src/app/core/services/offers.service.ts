import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Offer } from '../models/Offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  //variables
 offer:any
 url=Constant.API_ENDPOINT
 freelancer!:any;
 subject=new BehaviorSubject<Offer[]>([]);
  
 offer$=this.subject.asObservable();
 
  constructor(private http:HttpClient) { }
  //coute function
  public count(){
    this.offer=this.http.get(`${this.url}/offerCount`)
    return this.offer
  }

  //get data from database weth get methode 
  public index(){
    this.offer=this.http.get(`${this.url}/${Constant.OFFERS}`).pipe(shareReplay(1)).subscribe({
      next:(data:any)=>{
        this.subject.next(data)
      },
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation')    
    }).add(console.log('subject offer')
    );
   }
  //add function 
  public store(data:any):Observable<Offer>{
  this.offer=this.http.post(`${this.url}/${Constant.OFFERS}`,data);
  return this.offer
  }

    //update function
  public update(id: any, value: any):Observable<Offer>{
    this.offer=this.http.put(`${this.url}/${Constant.OFFERS}/${id}`,value);
    return this.offer
  }
   //deleted function
  public delete(id:number):Observable<Offer>{
    this.offer=this.http.delete(`${this.url}/${Constant.OFFERS}/${id}`);
    return this.offer
  }

  //get offer by id
  public show(id:any){
    this.offer=this.http.get(`${this.url}/${Constant.OFFERS}/${id}`).pipe(shareReplay(1)).subscribe({
      next:(data:any)=>{
        this.subject.next(data)
      },
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation')    
    }).add(console.log('subject offer')
    );
  }

   //show freelancer by id related by offer
  public showbyfreelancerid(id:any){
    this.offer=this.http.get(`${this.url}/${Constant.OFFERS}/freelancer/${id}`).pipe(shareReplay(1)).subscribe({
      next:(data:any)=>{
        this.subject.next(data)
      },
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation')    
    }).add(console.log('subject offer')
    )
  }
  //get offer by post and by freelancer 
  getOffersByPostAndFreelancer(postId: number, freelancerId: number){
    this.offer=this.http.get<Offer>(`${this.url}/offers/${postId}/${freelancerId}`).pipe(shareReplay(1)).subscribe({
      next:(data:any)=>{
        this.subject.next(data)
      },
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation')    
    }).add(console.log('subject offer')
    )
  }

  // get freelancer with attribut by post if true
  getFreelancerDetailsByPostIdTrue(postId: number){
    this.freelancer=this.http.get<any>(`${this.url}/offer/freelancerTrue/${postId}`).pipe(shareReplay(1)).subscribe({
      next:(data:any)=>{
        this.subject.next(data)
      },
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation')    
    }).add(console.log('subject offer')
    );
  }
   //get freelancer details by post if fase
  getFreelancerDetailsByPostIdFalse(postId: number){
    this.freelancer=this.http.get<any>(`${this.url}/offer/freelancerFalse/${postId}`).pipe(shareReplay(1)).subscribe({
      next:(data:any)=>{
        this.subject.next(data)
      },
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation')    
    }).add(console.log('subject offer')
    );
  }
   //get freelancer details by post if declined
   getFreelancerDetailsByPostIdDeclined(postId: number){
    this.freelancer=this.http.get<any>(`${this.url}/offer/freelancerDeclined/${postId}`).pipe(shareReplay(1)).subscribe({
      next:(data:any)=>{
        this.subject.next(data)
      },
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation')    
    }).add(console.log('subject offer')
    )
  }
  // get offer by post
  getOffersByPostId(postId: number) {
    this.offer=this.http.get(`${this.url}/offers/post/${postId}`).pipe(shareReplay(1)).subscribe({
      next:(data:any)=>{
        this.subject.next(data)
      },
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation')    
    }).add(console.log('subject offer')
    )
  }










  
}
