import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEstudanteComponent } from './add-estudante.component';

describe('AddEstudanteComponent', () => {
  let component: AddEstudanteComponent;
  let fixture: ComponentFixture<AddEstudanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEstudanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
