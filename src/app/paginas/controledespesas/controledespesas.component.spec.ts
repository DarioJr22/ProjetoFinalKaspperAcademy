import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControledespesasComponent } from './controledespesas.component';

describe('ControledespesasComponent', () => {
  let component: ControledespesasComponent;
  let fixture: ComponentFixture<ControledespesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControledespesasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControledespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
