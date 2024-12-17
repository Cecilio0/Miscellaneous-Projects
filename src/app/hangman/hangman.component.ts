import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

const HANGMAN_STATES: string[] = [
  `
  +---+
  |   |
      |
      |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
]

const ALPHABET = `
  Q W E R T Y U I O P
    A S D F G H J K L
      Z X C V B N M
`;

const WORDS = [
  'ant', 'baboon', 'badger', 'bat', 'bear', 'beaver', 'camel', 'cat', 'clam', 'cobra', 'cougar',
  'coyote', 'crow', 'deer', 'dog', 'donkey', 'duck', 'eagle', 'ferret', 'fox', 'frog', 'goat',
  'goose', 'hawk', 'lion', 'lizard', 'llama', 'mole', 'monkey', 'moose', 'mouse', 'mule', 'newt',
  'otter', 'owl', 'panda', 'parrot', 'pigeon', 'python', 'rabbit', 'ram', 'rat', 'raven',
  'rhino', 'salmon', 'seal', 'shark', 'sheep', 'skunk', 'sloth', 'snake', 'spider',
  'stork', 'swan', 'tiger', 'toad', 'trout', 'turkey', 'turtle', 'weasel', 'whale', 'wolf',
  'wombat', 'zebra'
]

@Component({
  selector: 'app-hangman',
  imports: [
    FormsModule
  ],
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.css'
})
export class HangmanComponent {
  currentState: number = 0;
  word: string = '';
  guessedWord: string = '';
  guessedLetters: string[] = [];
  correctLetters: boolean[] = [];
  isGameOver: boolean = false;
  isGuessedCorrectly: boolean = false;

  constructor() {
    this.startGame();
  }

  startGame() {
    this.currentState = 0;
    this.word = WORDS[this.randomInt(0, WORDS.length - 1)];
    this.guessedLetters = [];
    this.correctLetters = Array(this.word.length).fill(false);
    this.isGameOver = false;
    this.isGuessedCorrectly = false;
  }

  guessLetter(letter: string) {
    if (this.guessedLetters.includes(letter)) {
      return;
    }

    this.guessedLetters.push(letter);
    let correct = false;
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i].toUpperCase() == letter) {
        this.correctLetters[i] = true;
        correct = true;
      }
    }

    if (!correct) {
      this.currentState++;
      if (this.currentState === this.HANGMAN_STATES.length - 1) {
        this.isGameOver = true;
      }
    } else if (!this.correctLetters.includes(false)) {
      this.isGuessedCorrectly = true;
    }
  }

  guessWord() {
    if (this.guessedWord === '') {
      return;
    }

    if (this.guessedWord === this.word) {
      this.correctLetters = Array(this.word.length).fill(true);
      this.isGuessedCorrectly = true;
    } else {
      this.currentState++;
      if (this.currentState === this.HANGMAN_STATES.length - 1) {
        this.isGameOver = true;
      }
    }

    this.guessedWord = '';
  }

  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  protected readonly HANGMAN_STATES = HANGMAN_STATES;
  protected readonly ALPHABET = ALPHABET;
}
