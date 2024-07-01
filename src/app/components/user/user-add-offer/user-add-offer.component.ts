import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffersService } from '../../../core/services/offers.service';
import { PostsService } from '../../../core/services/posts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-add-offer',
  templateUrl: './user-add-offer.component.html',
  styleUrl: './user-add-offer.component.css'
})
export class UserAddOfferComponent {
  selectedBudget!:string;
  selectedPeriod!:string;
  clientId!:number;
  form!:FormGroup;
  isSubmitting: boolean = false;

  cities: string[] = ['Casablanca', 'Rabat', 'Fes', 'Marrakech', 'Tangier', 'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan','Autre'];


  constructor(  private fb:FormBuilder,private postsservice:PostsService,private router: Router){
    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      period: ['', Validators.required],
      periodvalue:[''],
      budget: ['', Validators.required],
      budgetvalue: [''],
      client_id:[1]
    });
  }

  onBudgetChange(event: any) {
    this.selectedBudget = event.target.value;
    
  }
  onSelectChange(event: any) {
    this.selectedPeriod = event.target.value;
    
  }


  addoffer() {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.postsservice.store(this.form.value).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['../pulse/client-profile/client-offers']); 
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

}
