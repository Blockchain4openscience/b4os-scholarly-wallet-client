import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleCardComponent } from './bundle-card.component';

describe('BundleCardComponent', () => {
  let component: BundleCardComponent;
  let fixture: ComponentFixture<BundleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundleCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
