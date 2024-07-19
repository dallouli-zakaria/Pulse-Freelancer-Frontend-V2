import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedLandingPageComponent } from './connected-landing-page.component';

describe('ConnectedLandingPageComponent', () => {
  let component: ConnectedLandingPageComponent;
  let fixture: ComponentFixture<ConnectedLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectedLandingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnectedLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
