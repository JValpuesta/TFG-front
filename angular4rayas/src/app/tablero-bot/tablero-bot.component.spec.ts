import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroBotComponent } from './tablero-bot.component';

describe('TableroBotComponent', () => {
  let component: TableroBotComponent;
  let fixture: ComponentFixture<TableroBotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableroBotComponent]
    });
    fixture = TestBed.createComponent(TableroBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
