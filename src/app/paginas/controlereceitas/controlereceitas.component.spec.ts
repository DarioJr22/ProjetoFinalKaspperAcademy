import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlereceitasComponent } from './controlereceitas.component';

describe('ControlereceitasComponent', () => {
  let component: ControlereceitasComponent;
  let fixture: ComponentFixture<ControlereceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlereceitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlereceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
