import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Permission } from '../../../../../../core/models/Permission';
import { PermissionService } from '../../../../../../core/services/permission.service';

@Component({
  selector: 'app-rolechips-autocomplete',
  templateUrl: './rolechips-autocomplete.component.html',
  styleUrl: './rolechips-autocomplete.component.css'
})
export class RolechipsAutocompleteComponent {
  myControl = new FormControl();
  options: Permission[]=[];
  filteredOptions!: Observable<Permission[]>;
  selectedOptions: Permission[] = [];
  subject!: Observable<Permission[]>;
 
  constructor(private permissionService: PermissionService) {}

  ngOnInit() {
  console.log(this.options);
  
    this.index();
  this.subject = this.permissionService.permessionData;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value ))
    );
  }

  private _filter(value:any):Permission[]{
    value=this.options
    return value
  }

  index() {
    this.permissionService.index();
    this.permissionService.permessionData.subscribe({
      next: (data) => {
        this.options = data;
      
      },
      error: (error) => console.log(error)
    });
  }

  addOption(option: Permission) {
    if (!this.selectedOptions.includes(option)) {
      this.selectedOptions.push(option);
      this.myControl.setValue('');
    }
  }

  removeOption(option: Permission) {
    const index = this.selectedOptions.indexOf(option);
    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    }
  }
}
