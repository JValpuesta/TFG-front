import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreandoPartidaComponent } from './creando-partida.component';

describe('CreandoPartidaComponent', () => {
  let component: CreandoPartidaComponent;
  let fixture: ComponentFixture<CreandoPartidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreandoPartidaComponent]
    });
    fixture = TestBed.createComponent(CreandoPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
