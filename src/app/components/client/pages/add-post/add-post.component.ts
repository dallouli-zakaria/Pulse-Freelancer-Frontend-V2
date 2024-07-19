import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { PostsService } from '../../../../core/services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {

  @Output() skillsSubmitted = new EventEmitter<string[]>();



  skills: string[] = ['JavaScript', 'PHP', 'Python', 'Java', 'C#', 'Angular', 'React'];
  filteredSkills: string[] = [];
  selectedSkills: string[] = [];
  showSuggestions: boolean = false;
  role!:string;
  roles!:string;
  isAuthenticated: boolean = false;




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
      title: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      nbrf: [''],
      skills: [[]],
      period: ['', Validators.required],
      periodvalue:[0,Validators.required],
      budget: ['', Validators.required],
      budgetvalue: [0,Validators.required],
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
      this.postsservice.store(this.form.value).subscribe({
      next:   (res) => {
          console.log(res);
          this.router.navigate(['../pulse/client-profile/client-offers']); 
        },
      error : (err) => 
           console.log(err)
        
      })
    } else {
      console.log('Form is invalid');
    }
  }

 


  onSkillsSelected(skills: string[]) {
    this.selectedSkills = skills;
    this.form.patchValue({ skills: this.selectedSkills });
  }





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
    
    // Check if the entered skill exists in the predefined skills array
    if (value && this.skills.includes(value) && !this.selectedSkills.includes(value)) {
      this.selectedSkills.push(value);
      this.form.get('skillInput')?.reset();
      this.filteredSkills = [];
      this.showSuggestions = false;
    } else {
      // Optionally, you can show a message or handle invalid skill entries here
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

  onSubmit(): void {
    if (this.selectedSkills.length > 0) {
      this.skillsSubmitted.emit(this.selectedSkills);
      this.selectedSkills = [];
    }
  }
}
