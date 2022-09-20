import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalteradespesasComponent } from './formalteradespesas.component';

describe('FormalteradespesasComponent', () => {
  let component: FormalteradespesasComponent;
  let fixture: ComponentFixture<FormalteradespesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormalteradespesasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormalteradespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
