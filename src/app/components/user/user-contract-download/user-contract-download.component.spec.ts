import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContractDownloadComponent } from './user-contract-download.component';

describe('UserContractDownloadComponent', () => {
  let component: UserContractDownloadComponent;
  let fixture: ComponentFixture<UserContractDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserContractDownloadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserContractDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
