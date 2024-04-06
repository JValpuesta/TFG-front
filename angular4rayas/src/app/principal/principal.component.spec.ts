import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Fireworks } from 'fireworks-js'
import { PrincipalComponent } from './principal.component';

describe('PrincipalComponent', () => {
  let component: PrincipalComponent;
  let fixture: ComponentFixture<PrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrincipalComponent]
    });
    fixture = TestBed.createComponent(PrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
