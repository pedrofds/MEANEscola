import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudantesListComponent } from './estudantes-list.component';

describe('EstudantesListComponent', () => {
  let component: EstudantesListComponent;
  let fixture: ComponentFixture<EstudantesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudantesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudantesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
