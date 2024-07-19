import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { SkillService } from '../../../core/services/skill.service';

@Component({
  selector: 'app-skillchips',
  templateUrl: './skillchips.component.html',
  styleUrl: './skillchips.component.css'
})
export class SkillchipsComponent implements OnInit{
  @Output() skillsSubmitted = new EventEmitter<string[]>();
  @Output() skillsSelected = new EventEmitter<string[]>();

  form!: FormGroup;
  skills: string[] = ['JavaScript', 'PHP', 'Python', 'Java', 'C#', 'Angular', 'React'];
  filteredSkills: string[] = [];
  selectedSkills: string[] = [];
  showSuggestions: boolean = false;
  role!:string;
  roles!:string;
  isAuthenticated: boolean = false;
  constructor(private fb: FormBuilder, private skillservice:SkillService,public authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      skillInput: ['']
    });

    this.form.get('skillInput')?.valueChanges.subscribe(value => {
      if (value && value.length >= 2) {
        this.filteredSkills = this.filterSkills(value);
        this.showSuggestions = true;
      } else {
        this.filteredSkills = [];
        this.showSuggestions = false;
      }
    });


    this.isAuthenticated = this.authService.isLoggedIn();
    //this.rolservice.getRoles('superadmin_role').subscribe((res)=>console.log(res));
    if (this.isAuthenticated) {
    let sub = this.authService.parseID();
    this.authService.getuserdetails(sub).subscribe((res) => {
      this.roles=res.roles;
      if(res.roles=='client_role'){
      this.role = 'Client';
    }
    else if(res.roles=='freelancer_role'){
      this.role = 'Freelancer';
    }
    });
  }

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
      this.skillsSelected.emit(this.skills);
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
      this.skillsSelected.emit(this.skills);
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
