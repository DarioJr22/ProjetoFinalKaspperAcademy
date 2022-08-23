import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsTotaisComponent } from './cards-totais.component';

describe('CardsTotaisComponent', () => {
  let component: CardsTotaisComponent;
  let fixture: ComponentFixture<CardsTotaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsTotaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsTotaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
