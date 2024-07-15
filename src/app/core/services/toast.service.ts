// core/services/toast.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: any[] = [];

  showSuccess(message: string) {
    this.show(message, 'success');
  }

  showError(message: string) {
    this.show(message, 'danger');
  }

  private show(message: string, type: string) {
    this.toasts.push({ message, type });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  getToasts() {
    return this.toasts;
  }
}