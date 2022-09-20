import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarregandoComponent } from './carregando.component';

describe('CarregandoComponent', () => {
  let component: CarregandoComponent;
  let fixture: ComponentFixture<CarregandoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarregandoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarregandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
