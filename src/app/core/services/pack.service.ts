import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Pack } from '../models/Pack';
import { Constant } from './../Constant';

@Injectable({
  providedIn: 'root',
})
export class PackService {
  pack: any;
  url = Constant.API_ENDPOINT;
  subject: BehaviorSubject<Pack[]> = new BehaviorSubject<Pack[]>([]);
  constructor(private http: HttpClient) {}
  // Observable to allow other components to subscribe to the pack data
  getData = this.subject.asObservable();

  // Get all packs
  public index() {
    // HTTP GET request to fetch all packs
    this.http
      .get(`${this.url}/pack`)
      .pipe(shareReplay(1))
      .subscribe({
        next: (data: any) => {
          this.subject.next(data); // Emit the fetched data through the BehaviorSubject
        },
        error: (error: any) => console.log(error), // Log any errors
        complete: () => console.log('end operation'), // Log when the operation completes
      })
      .add(console.log('end operation replay')); // Log end operation replay after subscription
  }

  // Update a pack by ID
  public update(id: number, data: any): Observable<Pack[]> {
    // HTTP PUT request to update a pack
    this.pack = this.http.put<Pack[]>(`${this.url}/pack/${id}`, data);
    return this.pack; // Return the updated pack as an observable
  }

  // Create a new pack
  public store(data: any): Observable<Pack[]> {
    // HTTP POST request to create a new pack
    this.pack = this.http.post<Pack[]>(`${this.url}/pack`, data);
    return this.pack; // Return the newly created pack as an observable
  }

  // Delete a pack by ID
  public delete(id: number): Observable<Pack[]> {
    // HTTP DELETE request to delete a pack
    this.pack = this.http.delete<Pack[]>(`${this.url}/pack/${id}`);
    return this.pack; // Return the deleted pack as an observable
  }
}
