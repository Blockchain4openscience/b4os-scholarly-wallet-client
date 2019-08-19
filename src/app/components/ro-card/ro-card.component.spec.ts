import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoCardComponent } from './ro-card.component';

describe('RoCardComponent', () => {
  let component: RoCardComponent;
  let fixture: ComponentFixture<RoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
