import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiscoComponent } from './create-disco.component';

describe('CreateDiscoComponent', () => {
  let component: CreateDiscoComponent;
  let fixture: ComponentFixture<CreateDiscoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDiscoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
