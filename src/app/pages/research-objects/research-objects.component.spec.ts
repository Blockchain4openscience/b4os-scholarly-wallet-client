import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchObjectsComponent } from './research-objects.component';

describe('ResearchObjectsComponent', () => {
  let component: ResearchObjectsComponent;
  let fixture: ComponentFixture<ResearchObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchObjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
