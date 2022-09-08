import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmconstrucaoComponent } from './emconstrucao.component';

describe('EmconstrucaoComponent', () => {
  let component: EmconstrucaoComponent;
  let fixture: ComponentFixture<EmconstrucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmconstrucaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmconstrucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
