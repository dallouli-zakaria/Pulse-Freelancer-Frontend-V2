import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  dropdownOpen = false;
  selectedOption: string | null = null;

  tokenn!: any;
  userid: any;
  username!: string;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.get();
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.dropdownOpen = false;
  }

  get(): void {
    const token = localStorage.getItem('JWT_TOKEN');
    if (token) {
      this.tokenn = JSON.parse(token);
      const atoken = this.tokenn.access_token;
      const deco = this.authService.decodeToken(atoken);
      this.userid = deco.sub;

      this.authService.getuserdetails(this.userid).subscribe((res) => {
        this.username = res.name;
      });
    }
  }

  // const token = localStorage.getItem('JWT_TOKEN');
  // if (token) {
  //   this.tokenn = JSON.parse(token);
  //   const atoken = this.tokenn.access_token;
  //   const deco = this.authservice.decodeToken(atoken);
  //   this.userid = deco.sub;

  //   this.authservice.getuserdetails(this.userid).subscribe((res) => {
  //     this.username = res.name;
  //     // Initialize form with userid
  //     this.form = this.fb.group({
  //       title: ['', Validators.required],
  //       location: ['', Validators.required],
  //       type: ['', Validators.required],
  //       description: ['', Validators.required],
  //       period: ['', Validators.required],
  //       periodvalue: [''],
  //       budget: ['', Validators.required],
  //       budgetvalue: [''],
  //       userid: [this.userid] // Initialize userid field with decoded userid
  //     });
  //   });
  // }
}
