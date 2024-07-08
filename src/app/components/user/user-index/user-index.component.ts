import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrl: './user-index.component.css'
})
export class UserIndexComponent implements OnInit{

  loadingService = inject(LoadingService);


  loading$!: Observable<boolean>;

  ngOnInit() {
  this.loading$ = this.loadingService.loading$;
  }

}
