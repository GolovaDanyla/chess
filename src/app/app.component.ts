import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chest';
  cells: any[] = [
    '♖', '♘', '♗', '♔', '♕', '♗', '♘', '♖',
    '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
    '♜', '♞', '♝', '♚', '♛', '♝', '♞', '♜',
  ];
  figures: string[] = ['♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟'];
  isWhitePawn(fp: any) {
    return fp == '♙'
  }
  isWhite(fig: any) {
    return '♖♘♗♔♕♗♘♖♙'.includes(fig);
  }

  isBlack(fig: any) {
    return '♟♜♞♝♚♛♝♞♜'.includes(fig);
  }

  // constructor() {
  //   // this.cells = Array.from({ length: 64 }, () => '');
  // }
  active: number = -1;
  oneClick(i: number) {

    // если клетка пустая ИЛИ (есть активная И цель имеет белую пешку)
    if (
      this.active > -1 &&
      this.active !== i && (
        '' === this.cells[i] || (
          (this.isWhite(this.cells[i]) && this.isBlack(this.cells[this.active])) ||
          (this.isBlack(this.cells[i]) && this.isWhite(this.cells[this.active])))
      )
    ) {
      this.cells[i] = this.cells[this.active];
      this.cells[this.active] = '';
      this.active = -1;
    } else {

      // если есть фигура, или клетка занята
      if ('' !== this.cells[i]) {
        this.active = i;
      }
    }

    console.log({ c: this.cells[i], b: '' === this.cells[i], a: this.active });
  }
  pos(i: number) {
    const row = Math.floor(i / 8) % 2;
    return i % 2 == +(row === 0);
  }
}
