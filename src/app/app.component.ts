import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chest';
  cells: any[] = [];
  figures: string[] = ['♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟'];
  constructor() {
    this.cells = Array.from({ length: 64 }, () => '');
  }

  pos(i: number) {
    const row = Math.floor(i / 8) % 2;
    return i % 2 == +(row === 0);
  }
}
