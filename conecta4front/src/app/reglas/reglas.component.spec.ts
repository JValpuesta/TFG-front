import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartidasEmpezadasComponent } from './reglas.component';

describe('PartidasEmpezadasComponent', () => {
  let component: PartidasEmpezadasComponent;
  let fixture: ComponentFixture<PartidasEmpezadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartidasEmpezadasComponent]
    });
    fixture = TestBed.createComponent(PartidasEmpezadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
