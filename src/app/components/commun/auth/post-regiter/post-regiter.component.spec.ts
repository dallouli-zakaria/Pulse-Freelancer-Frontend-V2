import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRegiterComponent } from './post-regiter.component';

describe('PostRegiterComponent', () => {
  let component: PostRegiterComponent;
  let fixture: ComponentFixture<PostRegiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostRegiterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostRegiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
