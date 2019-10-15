import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFuncionarioComponent } from './add-funcionario.component';

describe('AddFuncionarioComponent', () => {
  let component: AddFuncionarioComponent;
  let fixture: ComponentFixture<AddFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
