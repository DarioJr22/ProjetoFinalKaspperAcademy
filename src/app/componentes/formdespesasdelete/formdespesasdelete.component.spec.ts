import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdespesasdeleteComponent } from './formdespesasdelete.component';

describe('FormdespesasdeleteComponent', () => {
  let component: FormdespesasdeleteComponent;
  let fixture: ComponentFixture<FormdespesasdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormdespesasdeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormdespesasdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
