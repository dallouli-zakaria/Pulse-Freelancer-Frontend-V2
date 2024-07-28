import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: boolean = false;

  show() {
    this.loading = true;
  }

  hide() {
    this.loading = false;
  }

  isLoading(): boolean {
    return this.loading;
  }
}
