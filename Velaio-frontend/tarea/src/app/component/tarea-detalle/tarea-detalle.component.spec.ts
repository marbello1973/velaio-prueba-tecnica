import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaDetalleComponent } from './tarea-detalle.component';

describe('TareaDetalleComponent', () => {
  let component: TareaDetalleComponent;
  let fixture: ComponentFixture<TareaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
