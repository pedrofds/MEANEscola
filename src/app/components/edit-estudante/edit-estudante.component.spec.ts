import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEstudanteComponent } from './edit-estudante.component';

describe('EditEstudanteComponent', () => {
  let component: EditEstudanteComponent;
  let fixture: ComponentFixture<EditEstudanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEstudanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
