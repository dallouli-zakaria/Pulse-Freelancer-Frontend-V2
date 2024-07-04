import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffersService } from '../../../core/services/offers.service';
import { PostsService } from '../../../core/services/posts.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


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
  tokenn!: any;
  userid!:any;
  cities: string[] = ['Casablanca', 'Rabat', 'Fes', 'Marrakech', 'Tangier', 'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan','Autre'];


  constructor(  private fb:FormBuilder,private postsservice:PostsService,private router: Router,private authservice:AuthService){
    this.get();
    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      period: ['', Validators.required],
      periodvalue:[''],
      budget: ['', Validators.required],
      budgetvalue: [''],
      client_id:[this.userid]
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

  get(): void {
    const token = localStorage.getItem('JWT_TOKEN');
    if (token) {
      this.tokenn = JSON.parse(token);
      const atoken = this.tokenn.access_token;
      const deco = this.authservice.decodeToken(atoken);
      this.userid = deco.sub;

      this.authservice.getuserdetails(this.userid).subscribe((res) => {
        this.userid = res.id;
      });
    }

    }

}
