import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoComponent } from './add-ro.component';

describe('AddRoComponent', () => {
  let component: AddRoComponent;
  let fixture: ComponentFixture<AddRoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
