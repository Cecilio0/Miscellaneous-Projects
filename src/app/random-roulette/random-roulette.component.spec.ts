import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomRouletteComponent } from './random-roulette.component';

describe('RandomRouletteComponent', () => {
  let component: RandomRouletteComponent;
  let fixture: ComponentFixture<RandomRouletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomRouletteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomRouletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
