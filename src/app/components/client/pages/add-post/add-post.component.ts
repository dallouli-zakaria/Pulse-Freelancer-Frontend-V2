import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { PostsService } from '../../../../core/services/posts.service';
import { ClientService } from './../../../../core/services/client.service';
import { LoadingService } from '../../../../core/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit {
  @Output() skillsSubmitted = new EventEmitter<string[]>();

  // Form and data properties
  form!: FormGroup;
  isSubmitting = false;
  selectedSkillIds: number[] = [];
  selectedSkills: string[] = [];
  selectedBudget!: string;
  selectedPeriod!: string;
  isAuthenticated = false;
  clientdetails: any;

  // Predefined data
  skills: string[] = ['JavaScript', 'PHP', 'Python', 'Java', 'C#', 'Angular', 'React'];
  cities: string[] = ['Casablanca', 'Rabat', 'Fes', 'Marrakech', 'Tangier', 'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan', 'Autre'];
  characterCount: number = 0;
  // UI control properties
  filteredSkills: string[] = [];
  showSuggestions = false;

  constructor(
    private fb: FormBuilder,
    private postsservice: PostsService,
    private router: Router,
    private authservice: AuthService,
    private clientservice: ClientService,
    private loadingservice: LoadingService
  ) {
    
  }

  ngOnInit(): void {
    this.accessAddOffer();
  }

  // Initialize the form
  private initForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      freelancers_number: [''],
      skills_required: [[]],
      period: ['', Validators.required],
      periodvalue: [0, Validators.required],
      budget: ['', Validators.required],
      budgetvalue: [0, Validators.required],
      client_id: [this.authservice.parseID()]
    });
  }

  // Handle form submission
  addoffer(): void {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.postsservice.store(this.form.value).subscribe({
        next: (res) => {
          Swal.fire({
            icon: "success",
            title: "Votre offer a été ajouté avec succès",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['../pulse/client-profile/client-offers-open']);
        },
        error: (err) => console.error('Error adding offer:', err)
      });
    } else {
      console.log('Form is invalid');
    }
  }

  // Event handlers
  onBudgetChange(event: any): void {
    this.selectedBudget = event.target.value;
  }

  onSelectChange(event: any): void {
    this.selectedPeriod = event.target.value;
  }

  onSkillsSelected2(skillIds: number[]): void {
    this.selectedSkillIds = skillIds;
    this.form.patchValue({ skills_required: this.selectedSkillIds });
  }

  // Skill filtering and selection methods
  filterSkills(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.skills.filter(skill => 
      skill.toLowerCase().includes(filterValue) && 
      !this.selectedSkills.includes(skill)
    );
  }

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    if (input && input.length >= 2) {
      this.filteredSkills = this.filterSkills(input);
      this.showSuggestions = true;
    } else {
      this.filteredSkills = [];
      this.showSuggestions = false;
    }
  }

  addSkill(event: Event): void {
    event.preventDefault();
    const value = this.form.get('skillInput')?.value.trim();
    if (value && this.skills.includes(value) && !this.selectedSkills.includes(value)) {
      this.selectedSkills.push(value);
      this.form.get('skillInput')?.reset();
      this.filteredSkills = [];
      this.showSuggestions = false;
    } else {
      console.log('Please select a skill from the suggestions.');
    }
  }

  addSkillFromList(skill: string): void {
    if (!this.selectedSkills.includes(skill)) {
      this.selectedSkills.push(skill);
      this.form.get('skillInput')?.reset();
      this.filteredSkills = [];
      this.showSuggestions = false;
    }
  }

  removeSkill(skill: string): void {
    const index = this.selectedSkills.indexOf(skill);
    if (index >= 0) {
      this.selectedSkills.splice(index, 1);
    }
  }

  // Access control method
  accessAddOffer(): void {
    this.initForm();
    this.loadingservice.show();
    this.isAuthenticated = this.authservice.isLoggedIn();
    if (this.isAuthenticated) {
      this.clientservice.show(this.authservice.parseID());
      this.clientservice.getData$.subscribe((res) => {
        this.clientdetails = res;
        if (this.clientdetails.profession == null || this.clientdetails.company_name == null) {
          this.router.navigate(['/pulse/client-profile/client-infos']);
        } else {
          this.loadingservice.hide();
        }
      });
    }
  }

  onDescriptionInput(): void {
    const description = this.form.get('description');
    if (description) {
      this.characterCount = description.value?.length || 0;
    }
  }
}