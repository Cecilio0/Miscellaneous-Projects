import { Component } from '@angular/core';

const DIFFICULTIES = [
  {
    name: "Easy",
    rows: 10,
    cols: 10,
    mines: 15
  },
  {
    name: "Medium",
    rows: 15,
    cols: 15,
    mines: 50
  },
  {
    name: "Hard",
    rows: 20,
    cols: 20,
    mines: 100
  },
]

@Component({
  selector: 'app-minesweeper',
  imports: [],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.css'
})
export class MinesweeperComponent {
  selectedDifficulty: number = 0;
  rows: number = 15;
  cols: number = 15;
  mines: number = 40;
  board: number[][] = [];
  reveal: boolean = true;
  isRevealed: boolean[][] = [];
  isFlagged: boolean[][] = [];
  isGameOver: boolean = false;
  isComplete: boolean = false;

  onDifficultySelect(i: number) {
    this.selectedDifficulty = i;
    this.rows = DIFFICULTIES[i].rows;
    this.cols = DIFFICULTIES[i].cols;
    this.mines = DIFFICULTIES[i].mines;
    this.fillBoard();
  }

  constructor() {
    this.fillBoard();
  }

  fillBoard() {
    // Prepare the board
    this.board = new Array(this.rows).fill(0).map(() => new Array(this.cols).fill(0));
    this.isRevealed = new Array(this.rows).fill(false).map(() => new Array(this.cols).fill(false));
    this.isFlagged = new Array(this.rows).fill(false).map(() => new Array(this.cols).fill(false));
    this.isGameOver = false;
    this.isComplete = false;

    // place mines on the board
    let minePlacements = this.getMinePlacements();
    for (let i = 0; i < minePlacements.length; i++) {
      this.board[minePlacements[i][0]][minePlacements[i][1]] = -1;
    }

    // populate the rest of the board with numbers
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if(this.board[i][j] === -1)
          continue;

        let count = 0;

        if (i > 0 && j > 0 && this.board[i - 1][j - 1] == -1) count++;
        if (i > 0 && this.board[i - 1][j] == -1) count++;
        if (i > 0 && j < this.cols - 1 && this.board[i - 1][j + 1] == -1) count++;
        if (j > 0 && this.board[i][j - 1] == -1) count++;
        if (j < this.cols - 1 && this.board[i][j + 1] == -1) count++;
        if (i < this.rows - 1 && j > 0 && this.board[i + 1][j - 1] == -1) count++;
        if (i < this.rows - 1 && this.board[i + 1][j] == -1) count++;
        if (i < this.rows - 1 && j < this.cols - 1 && this.board[i + 1][j + 1] == -1) count++;

        this.board[i][j] = count;
      }
    }
  }

  // The resulting array is a collection of coordinates that represent the placement of mines on the board
  getMinePlacements(): number[][] {
    let coordinate = [this.getRandomInt(0, this.rows), this.getRandomInt(0, this.cols)];
    let minePlacements = [coordinate];
    while (minePlacements.length < this.mines) {
      coordinate = [this.getRandomInt(0, this.rows), this.getRandomInt(0, this.cols)];
      while (minePlacements.includes(coordinate)) {
        coordinate = [this.getRandomInt(0, this.rows), this.getRandomInt(0, this.cols)];
      }
      minePlacements.push(coordinate);
    }

    return minePlacements;
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  onCellClick(row: number, col: number) {
    if (this.reveal && !this.isFlagged[row][col]) {
      this.isRevealed[row][col] = true;

      if (this.board[row][col] === -1) {
        this.isGameOver = true;
      } else if (this.board[row][col] === 0) {
        this.isRevealed[row][col] = false;
        this.revealEmptyAdjacentCells(row, col);
      }

      this.checkGameStatus();
    } else if (!this.reveal) {
      this.isFlagged[row][col] = !this.isFlagged[row][col];
    }
  }

  onRevealSet() {
    this.reveal = true;
  }

  onFlagSet() {
    this.reveal = false;
  }

  revealEmptyAdjacentCells(row: number, col: number) {
    if (row < 0 || col < 0 || row >= this.rows || col >= this.cols || this.isRevealed[row][col])
      return;

    this.isRevealed[row][col] = true;

    if (this.board[row][col] === 0) {
      this.revealEmptyAdjacentCells(row, col + 1);
      this.revealEmptyAdjacentCells(row, col - 1);
      this.revealEmptyAdjacentCells(row + 1, col);
      this.revealEmptyAdjacentCells(row + 1, col + 1);
      this.revealEmptyAdjacentCells(row + 1, col - 1);
      this.revealEmptyAdjacentCells(row - 1, col);
      this.revealEmptyAdjacentCells(row - 1, col + 1);
      this.revealEmptyAdjacentCells(row - 1, col - 1);
    }
  }

  checkGameStatus() {
    let isComplete = true;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.board[i][j] !== -1 && !this.isRevealed[i][j]) {
          isComplete = false;
          break;
        }
      }
    }

    this.isComplete = isComplete;
  }

  protected readonly DIFFICULTIES = DIFFICULTIES;
}
