import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleViewComponent } from './bundle-view.component';

describe('BundleViewComponent', () => {
  let component: BundleViewComponent;
  let fixture: ComponentFixture<BundleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
