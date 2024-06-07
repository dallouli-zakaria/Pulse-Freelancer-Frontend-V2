import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeftbarComponent } from './admin-leftbar.component';

describe('AdminLeftbarComponent', () => {
  let component: AdminLeftbarComponent;
  let fixture: ComponentFixture<AdminLeftbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLeftbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminLeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
