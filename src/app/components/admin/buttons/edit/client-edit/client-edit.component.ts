import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent {
@Input() clientName: any;
@Input() clientId!: number;
}
