import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbasHomeComponent } from './abas-home.component';

describe('AbasHomeComponent', () => {
  let component: AbasHomeComponent;
  let fixture: ComponentFixture<AbasHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbasHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
