import { Routes } from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {RoulettePageComponent} from './roulette-page/roulette-page.component';
import {MinesweeperComponent} from './minesweeper/minesweeper.component';
import {HangmanComponent} from './hangman/hangman.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Landing Page'
  },
  {
    path: 'roulette-decide',
    component: RoulettePageComponent,
    title: 'Roulette Decide'
  },
  {
    path: 'mine-sweeper',
    component: MinesweeperComponent,
    title: 'Mine Sweeper'
  },
  {
    path: 'hangman',
    component: HangmanComponent,
    title: 'Hangman'
  }
];
