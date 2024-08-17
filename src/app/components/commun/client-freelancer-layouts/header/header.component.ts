import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  dropdownOpen = false;
  selectedOption: string | null = null;
  username!: string;
  role!: string;
  roles!: string;
  isAuthenticated: boolean = false;
  router = inject(Router);

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    if (this.isAuthenticated) {
      let sub = this.authService.parseID();
      this.authService.getuserdetails(sub).subscribe((res) => {
        this.username = res.user.name;
        this.roles = res.roles;
        if (res.roles == 'client_role') {
          this.role = 'Client';
        } else if (res.roles == 'freelancer_role') {
          this.role = 'Freelancer';
        } else if (res.roles == 'superadmin_role') {
          this.router.navigate(['/admin']);
        }
      });
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.dropdownOpen = false;
  }
}
