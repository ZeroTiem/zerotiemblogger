import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NETComponent } from './net.component';

describe('NETComponent', () => {
  let component: NETComponent;
  let fixture: ComponentFixture<NETComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NETComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NETComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
