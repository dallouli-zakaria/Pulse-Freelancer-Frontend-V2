import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { SkillService } from '../../../core/services/skill.service';

@Component({
  selector: 'app-skillchips',
  templateUrl: './skillchips.component.html',
  styleUrls: ['./skillchips.component.css']
})
export class SkillchipsComponent implements OnInit {
  @Output() skillsSubmitted = new EventEmitter<number[]>();
  @Output() skillsSelected = new EventEmitter<number[]>();
  
  form!: FormGroup;
  skills: { id: number, title: string }[] = [];
  filteredSkills: { id: number, title: string }[] = [];
  selectedSkills: number[] = []; // Array of skill IDs
  showSuggestions: boolean = false;
  role!: string;
  roles!: string;
  isAuthenticated: boolean = false;
  freelancerId: number = this.authService.parseID();
  
  constructor(private fb: FormBuilder, private skillservice: SkillService, public authService: AuthService) { }
  
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
    if (this.isAuthenticated) {
      let sub = this.authService.parseID();
      this.authService.getuserdetails(sub).subscribe((res) => {
        this.roles = res.roles;
        if (res.roles === 'client_role') {
          this.role = 'Client';
        } else if (res.roles === 'freelancer_role') {
          this.role = 'Freelancer';
        }
      });
    }
    // Load skills from the service
    this.loadSkills();
  }
  
  loadSkills(): void {
    this.skillservice.index().subscribe((res) => {
      this.skills = res;
    });
  }
  
  filterSkills(value: string): { id: number, title: string }[] {
    const filterValue = value.toLowerCase();
    return this.skills.filter(skill => 
      skill.title.toLowerCase().includes(filterValue) && 
      !this.selectedSkills.includes(skill.id)
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
  
    // Find the skill object by title
    const skill = this.skills.find(s => s.title === value);
  
    if (skill && !this.selectedSkills.includes(skill.id)) {
      this.selectedSkills.push(skill.id);
      this.form.get('skillInput')?.reset();
      this.filteredSkills = [];
      this.showSuggestions = false;
      this.skillsSelected.emit(this.selectedSkills);
    } else {
      console.log('Please select a skill from the suggestions!');
    }
  }
  
  addSkillFromList(skill: { id: number, title: string }): void {
    if (!this.selectedSkills.includes(skill.id)) {
      this.selectedSkills.push(skill.id);
      this.form.get('skillInput')?.reset();
      this.filteredSkills = [];
      this.showSuggestions = false;
      this.skillsSelected.emit(this.selectedSkills);
    }

    
  }
  
  removeSkill(skillId: number): void {
    const index = this.selectedSkills.indexOf(skillId);
    if (index >= 0) {
      this.selectedSkills.splice(index, 1);
      this.skillsSelected.emit(this.selectedSkills);
    }
    
  }
  
  onSubmit(): void {
    if (this.selectedSkills.length > 0 && this.roles=='freelancer_role') {
      const skillIds = this.selectedSkills; // Use the selectedSkills array directly
  
      console.log('Skills to be updated:', { skills: skillIds });  // Log the data
  
      this.skillservice.updateFreelancerSkills(this.freelancerId, { skills: skillIds }).subscribe(
        response => {
          console.log('Skills updated successfully:', response);
          this.selectedSkills = [];
          this.form.reset();
        },
        error => {
          console.error('Error updating skills:', error);
          if (error.status === 500) {
            console.log('Internal Server Error');
          } else {
            console.log('Error:', error.message);
          }
        }
      );
    }
  }
  
  getSkillTitleById(skillId: number): string {
    const skill = this.skills.find(s => s.id === skillId);
    return skill ? skill.title : 'Unknown Skill';
  }
  
}
