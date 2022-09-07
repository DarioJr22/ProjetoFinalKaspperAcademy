import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormreceitasComponent } from './formreceitas.component';

describe('FormreceitasComponent', () => {
  let component: FormreceitasComponent;
  let fixture: ComponentFixture<FormreceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormreceitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormreceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
