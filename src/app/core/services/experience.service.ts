import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { BehaviorSubject, catchError, Observable, shareReplay, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  //variables
  private url = Constant.API_ENDPOINT;
  private subject = new BehaviorSubject<Experience[]>([]);
  private freelancer:any
  public experienceData$ = this.subject.asObservable();
  
  constructor(private http: HttpClient) {}

  // Count function
  public count(): Observable<number> {
    return this.http.get<number>(`${this.url}/experienceCount`);
  }

  // Get data from database
  public index(): void {
    this.http.get<Experience[]>(`${this.url}/${Constant.EXPERIENCE}`)
      .pipe(
        shareReplay(1),
        tap(data => this.subject.next(data)),
        catchError(this.handleError('index', []))
      )
      .subscribe();
  }

  // Add function
  public store(data: Experience): Observable<Experience[]> {
    return this.http.post<Experience[]>(`${this.url}/${Constant.EXPERIENCE}`, data);
  }

  // Update function
  public update(id: number, data: Experience): Observable<Experience> {
    return this.http.put<Experience>(`${this.url}/${Constant.EXPERIENCE}/${id}`, data);
  }

  // Delete function
  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${Constant.EXPERIENCE}/${id}`);
  }

  // Add experience
  public addExperience(data: Experience, id: number): Observable<Experience> {
    return this.http.post<Experience>(`${this.url}/${Constant.EXPERIENCE}/${id}/experience`, data);
  }

  // Get experience by ID using subject behavior
  public show(id: number): void {
    this.http.get<Experience>(`${this.url}/${Constant.EXPERIENCE}/${id}`)
      .pipe(
       shareReplay(1),
       tap(data => this.subject.next([data])) // Assuming you want to update the subject with a single item
      )
      .subscribe();
  }

  public showByFreelancer(id:any){
    this.freelancer=this.http.get(`${this.url}/${Constant.FREELANCERS}/${id}`).subscribe({
      next:(data: any)=>{this.subject.next(data)
      console.log(data);
        
       },
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation')
    }).add(console.log('subjetc contract'));
  }

  // Error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return new Observable<T>(); // Return an empty result or handle appropriately
    };
  }

}
