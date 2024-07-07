import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../../core/services/posts.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Post } from '../../../core/models/post';

@Component({
  selector: 'app-user-update-offer',
  templateUrl: './user-update-offer.component.html',
  styleUrl: './user-update-offer.component.css'
})
export class UserUpdateOfferComponent implements OnChanges{

  @Input() parentdata!:Post;

  selectedBudget!:string;
  selectedPeriod!:string;
  clientId!:number;
  form!:FormGroup;
  isSubmitting: boolean = false;
  tokenn!: any;
  userid:any=this.authservice.parseID();
  cities: string[] = ['Casablanca', 'Rabat', 'Fes', 'Marrakech', 'Tangier', 'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan','Autre'];


  constructor(  private fb:FormBuilder,private postsservice:PostsService,private router: Router,private authservice:AuthService){

    this.form = this.fb.group({
      title: [this.parentdata?.title, Validators.required],
      location: [this.parentdata?.location, Validators.required],
      type: [this.parentdata?.type, Validators.required],
      description: [this.parentdata?.description, Validators.required],
      period: [this.parentdata?.period, Validators.required],
      periodvalue:[0,Validators.required],
      budget: [this.parentdata?.budget, Validators.required],
      budgetvalue: [0,Validators.required],
      client_id:[this.userid]
    });
  }
  ngOnChanges(): void {
    this.form = this.fb.group({
      title: [this.parentdata?.title, Validators.required],
      location: [this.parentdata?.location, Validators.required],
      type: [this.parentdata?.type, Validators.required],
      description: [this.parentdata?.description, Validators.required],
      period: [this.parentdata?.period, Validators.required],
      periodvalue:[this.parentdata?.periodvalue,Validators.required],
      budget: [this.parentdata?.budget, Validators.required],
      budgetvalue: [this.parentdata?.budgetvalue,Validators.required],
      client_id:[this.userid]
    });

  }

  onBudgetChange(event: any) {
    this.selectedBudget = event.target.value;
    
  }
  onSelectChange(event: any) {
    this.selectedPeriod = event.target.value;
    
  }


  updateoffer() {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.postsservice.store(this.form.value).subscribe(
        (res) => {
          console.log(res);
          
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
