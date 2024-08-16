import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../../../../core/models/post';
import { AuthService } from '../../../../core/services/auth.service';
import { PostsService } from '../../../../core/services/posts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-update-post',
  templateUrl: './client-update-post.component.html',
  styleUrl: './client-update-post.component.css'
})
export class ClientUpdatePostComponent implements OnChanges {
  @Input() parentdata!: Post;
  @Output() skillsSubmitted = new EventEmitter<string[]>();

  // Form and data properties
  form!: FormGroup;
  selectedSkillIds: number[] = [];
  selectedSkills: string[] = [];
  roles!: string;
  selectedBudget!: string;
  selectedPeriod!: string;
  isSubmitting: boolean = false;
  userid: any = this.authservice.parseID();

  // List of cities
  cities: string[] = ['Casablanca', 'Rabat', 'Fes', 'Marrakech', 'Tangier', 'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan', 'Autre'];

  constructor(
    private fb: FormBuilder,
    private postsservice: PostsService,
    private router: Router,
    private authservice: AuthService
  ) {
    this.initForm();
  }

  ngOnChanges(): void {
    this.getUserRole();
    this.initForm();
  }

  // Initialize the form
  private initForm(): void {
    this.form = this.fb.group({
      title: [this.parentdata?.title, Validators.required],
      location: [this.parentdata?.location, Validators.required],
      type: [this.parentdata?.type, Validators.required],
      description: [this.parentdata?.description, Validators.required],
      freelancers_number: [this.parentdata?.freelancers_number, Validators.required],
      skills_required: [[]],
      period: [this.parentdata?.period, Validators.required],
      periodvalue: [this.parentdata?.periodvalue, Validators.required],
      budget: [this.parentdata?.budget, Validators.required],
      budgetvalue: [this.parentdata?.budgetvalue, Validators.required],
      client_id: [this.userid]
    });
  }

  // Get user role
  private getUserRole(): void {
    this.authservice.getUserRole().subscribe((res) => {
      this.roles = res;
    });
  }

  // Handle budget change
  onBudgetChange(event: any): void {
    this.selectedBudget = event.target.value;
  }

  // Handle period change
  onSelectChange(event: any): void {
    this.selectedPeriod = event.target.value;
  }

  // Update offer
  updateoffer(): void {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.postsservice.update(this.parentdata.id, this.form.value).subscribe(
        (res) => {
          Swal.fire({
            icon: "success",
            title: "Offre modifié avec succès !",
            showConfirmButton: false,
            timer: 1500
          });
        },
        (err) => {
          console.error('Error updating offer:', err);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  // Handle skill selection
  onSkillsSelected2(skillIds: number[]): void {
    this.selectedSkillIds = skillIds;
    this.form.patchValue({ skills_required: this.selectedSkillIds });
  }

  // Delete offer
  deleteOffer(): void {
    this.postsservice.delete(this.parentdata.id).subscribe((res) => {
      Swal.fire({
        icon: "success",
        title: "Offre supprimé avec succès !",
        showConfirmButton: false,
        timer: 1500
      });
      this.navigateAfterDelete();
    });
  }

  // Navigate after delete based on user role
  private navigateAfterDelete(): void {
    if (this.roles === 'Client') {
      this.router.navigate(['../pulse/client-profile/client-offers-open']);
    } else if (this.roles === 'superadmin_role') {
      this.router.navigate(['../admin/post-open']);
    }
  }
}