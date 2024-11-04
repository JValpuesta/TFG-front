import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugarBotComponent } from './jugar-bot.component';

describe('JugarBotComponent', () => {
  let component: JugarBotComponent;
  let fixture: ComponentFixture<JugarBotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JugarBotComponent]
    });
    fixture = TestBed.createComponent(JugarBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
