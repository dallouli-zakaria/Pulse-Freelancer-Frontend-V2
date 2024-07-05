import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-rolechips-autocomplete',
  templateUrl: './rolechips-autocomplete.component.html',
  styleUrl: './rolechips-autocomplete.component.css'
})
export class RolechipsAutocompleteComponent {
  myControl = new FormControl();
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  filteredOptions!: Observable<string[]>;
  selectedOptions: string[] = [];

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  addOption(option: string) {
    if (!this.selectedOptions.includes(option)) {
      this.selectedOptions.push(option);
      this.myControl.setValue('');
    }
  }

  removeOption(option: string) {
    const index = this.selectedOptions.indexOf(option);
    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    }
  }
}
