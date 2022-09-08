import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormreceitasdeleteComponent } from './formreceitasdelete.component';

describe('FormreceitasdeleteComponent', () => {
  let component: FormreceitasdeleteComponent;
  let fixture: ComponentFixture<FormreceitasdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormreceitasdeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormreceitasdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
