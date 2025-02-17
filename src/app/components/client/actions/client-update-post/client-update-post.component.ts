import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
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
export class ClientUpdatePostComponent implements OnChanges ,OnInit{
  @Input() parentdata!: Post;
  @Output() skillsSubmitted = new EventEmitter<string[]>();

  selectedSkillIds: number[] = [];
  selectedSkills: string[] = [];
  roles!: string;
  selectedBudget!: string;
  selectedPeriod!: string;
  clientId!: number;
  form!: FormGroup;
  isSubmitting: boolean = false;
  tokenn!: any;
  cities: string[] = ['Casablanca', 'Rabat', 'Fes', 'Marrakech', 'Tangier', 'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan', 'Autre'];

  constructor(private fb: FormBuilder, private postsservice: PostsService, private router: Router, private authservice: AuthService) {}

  ngOnInit(): void {
    this.getroles();
    this.initializeForm();
  }

  ngOnChanges(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
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
      client_id: [this.parentdata?.client_id, Validators.required] 
    });
  }

  onBudgetChange(event: any) {
    this.selectedBudget = event.target.value;
  }

  onSelectChange(event: any) {
    this.selectedPeriod = event.target.value;
  }

  getroles(){
    this.authservice.getUserRole().subscribe((res) => {
      this.roles = res;
    });
  }

  updateoffer() {
    if (this.selectedSkillIds.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Aucune compétence sélectionnée",
        text: "Veuillez sélectionner au moins une compétence avant de modifier l'offre.",
        showConfirmButton: true
      });
      return;
    }

    if (this.form.valid) {
      this.isSubmitting = true;
      this.postsservice.update(this.parentdata.id, this.form.value).subscribe(
        (res) => {
          Swal.fire({
            icon: "success",
            title: "Offre modifiée avec succès !",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.reload();
          });
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

  onSkillsSelected2(skillIds: number[]) {
    this.selectedSkillIds = skillIds;
    this.form.patchValue({ skills_required: this.selectedSkillIds });
  }

  deleteOffer(){
    this.postsservice.delete(this.parentdata.id).subscribe((res)=>{
      Swal.fire({
        icon: "success",
        title: "Offre supprimé avec succès !",
        showConfirmButton: false,
        timer: 1500
      });
      if(this.roles == 'Client'){
        this.router.navigate(['../pulse/client-profile/client-offers-open'])
      } else if(this.roles == 'superadmin_role'){
        this.router.navigate(['../admin/post-open'])
      } 
    })
  }
}
