import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalterareceitasComponent } from './formalterareceitas.component';

describe('FormalterareceitasComponent', () => {
  let component: FormalterareceitasComponent;
  let fixture: ComponentFixture<FormalterareceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormalterareceitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormalterareceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
