import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SkillService } from '../../../../../core/services/skill.service';

interface SkillWithProgress {
  name: string;
  progress: number;
}

@Component({
  selector: 'app-skillchips',
  templateUrl: './skillchips.component.html',
  styleUrls: ['./skillchips.component.css']
})
export class SkillchipsComponent implements OnInit {
  @Output() skillsSubmitted = new EventEmitter<string[]>();

  form!: FormGroup;
  skills: string[] = ['JavaScript', 'PHP', 'Python', 'Java', 'C#', 'Angular', 'React'];
  filteredSkills: string[] = [];
  selectedSkills: string[] = [];
  showSuggestions: boolean = false;

  constructor(private fb: FormBuilder) { }

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
    if (value && !this.selectedSkills.includes(value)) {
      this.selectedSkills.push(value);
      this.form.get('skillInput')?.reset();
      this.filteredSkills = [];
      this.showSuggestions = false;
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