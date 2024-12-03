import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-random-roulette',
  imports: [
    NgStyle
  ],
  templateUrl: './random-roulette.component.html',
  styleUrl: './random-roulette.component.css'
})
export class RandomRouletteComponent {
  @HostBinding('style.--final-rotation')
  rotation: number = 0;

  segments: string[] = [];

  isIdle: boolean = true;

  isSpinning: boolean = false;
  selectedSegment: string | null = null;
  sectionSize: number = 360 / this.segments.length;

  setSegments(segments: string[]) {
    this.segments = segments;
    this.sectionSize = 360 / this.segments.length
  }

  @Output() onSpinFinishedEvent = new EventEmitter<string>();

  spinRoulette() {
    if (this.isSpinning) return; // Prevent multiple spins at once

    this.isIdle = false;

    this.sectionSize = 360 / this.segments.length;
    this.isSpinning = true;
    this.selectedSegment = null;

    const rotations = Math.floor(Math.random() * 5) + 7; // Random rotations amount of rotations between 5 and 10
    const spinDegrees = rotations * 360; // Convert to degrees
    const randomOffset = Math.floor(Math.random() * 360);

    this.rotation = spinDegrees + randomOffset; // Set final rotation

    setTimeout(() => {
      const segmentIndex = Math.floor((this.rotation % 360) / this.sectionSize);
      this.selectedSegment = this.segments[segmentIndex];
      this.isSpinning = false;
      this.onSpinFinishedEvent.emit(this.selectedSegment);
    }, 5000); // Match with the CSS transition duration
  }
}
