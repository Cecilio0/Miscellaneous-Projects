import {Component, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RandomRouletteComponent} from './random-roulette/random-roulette.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RandomRouletteComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'miscellaneous-minigames';
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
