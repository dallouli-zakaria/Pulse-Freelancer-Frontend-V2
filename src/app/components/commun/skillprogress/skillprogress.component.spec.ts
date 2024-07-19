import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillprogressComponent } from './skillprogress.component';

describe('SkillprogressComponent', () => {
  let component: SkillprogressComponent;
  let fixture: ComponentFixture<SkillprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillprogressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
