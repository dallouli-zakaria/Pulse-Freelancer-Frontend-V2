import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillchipsComponent } from './skillchips.component';

describe('SkillchipsComponent', () => {
  let component: SkillchipsComponent;
  let fixture: ComponentFixture<SkillchipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillchipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillchipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
