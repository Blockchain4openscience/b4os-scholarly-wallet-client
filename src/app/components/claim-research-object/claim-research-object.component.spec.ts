import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimResearchObjectComponent } from './claim-research-object.component';

describe('ClaimResearchObjectComponent', () => {
  let component: ClaimResearchObjectComponent;
  let fixture: ComponentFixture<ClaimResearchObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimResearchObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimResearchObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
