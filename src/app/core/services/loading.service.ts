import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: boolean = false;
  isLoadingChanged = new EventEmitter<boolean>();

  show() {
    this.loading = true;
    this.isLoadingChanged.emit(this.loading);
  }

  hide() {
    this.loading = false;
    this.isLoadingChanged.emit(this.loading);
  }

  isLoading(): boolean {
    return this.loading;
  }
}
