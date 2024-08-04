import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Pulse Freelancer';
  isLoading = false;

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.loadingService.isLoadingChanged.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
      this.cdr.detectChanges();
    });
  }
  ngOnInit(): void {
    

  }
}
