import {Component, ViewChild} from '@angular/core';
import {RandomRouletteComponent} from '../random-roulette/random-roulette.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-roulette-page',
  imports: [
    RandomRouletteComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './roulette-page.component.html',
  styleUrl: './roulette-page.component.css'
})
export class RoulettePageComponent {
  text: string = '';
  segments: string[] = [];
  isRouletteSpinning: boolean = false;
  rouletteResult: string | null = null;

  @ViewChild(RandomRouletteComponent) roulette!: RandomRouletteComponent;

  onTextAreaChange() {
    this.segments = this.text.split('\n')
      .map((segment) => segment.trim())
      .filter((segment) => segment.length > 0);
    this.roulette.setSegments(this.segments)
  }

  onSpinClicked() {
    this.roulette.spinRoulette();
    this.isRouletteSpinning = true;
  }

  showResult($event: string) {
    this.rouletteResult = $event;
    this.isRouletteSpinning = false;
  }
}
