import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '../../../../../core/models/Role';
import { User } from '../../../../../core/models/User';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RoleService } from '../../../../../core/services/role.service';
import { Observable } from 'rxjs';
import { Permission } from '../../../../../core/models/Permission';

@Component({
  selector: 'app-assign-role-to-user',
  templateUrl: './assign-role-to-user.component.html',
  styleUrl: './assign-role-to-user.component.css'
})
export class AssignRoleToUserComponent {
}
