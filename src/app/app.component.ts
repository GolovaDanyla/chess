import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';


const BLACK = false;
const WHITE = true;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  // private figures: string[] = ['♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟'];
  isWhitePawn(fp: any) {
    return fp == '♙'
  }

  isBlackPawn(fp: any) {
    return fp == '♟'
  }

  isWhite(fig: any) {
    return '♖♘♗♔♕♗♘♖♙'.includes(fig);
  }

  isBlack(fig: any) {
    return '♟♜♞♝♚♛♝♞♜'.includes(fig);
  }

  constructor(
    private cdr: ChangeDetectorRef
  ) {
    // this.cells = Array.from({ length: 64 }, () => '');
    for (let i = 0; i < 64; i++) {
      this.posArr[i] = this.pos(i)
    }
  }
  active: number = -1; // выбранная фигура
  currentMove: boolean = WHITE; // текущий ход

  oneClick(i: number) {
    // если клетка пустая ИЛИ (есть активная И цель имеет белую пешку)
    const isWhiteFromCell = this.isWhite(this.cells[this.active]);
    const isBlackFromCell = this.isBlack(this.cells[this.active]);
    const isEmptyCell = '' === this.cells[i];
    const isWhiteToCell = this.isWhite(this.cells[i]);
    const isBlackToCell = this.isBlack(this.cells[i]);
    const isTheSame = this.active === i;
    const isSetActive = this.active > -1 && !isTheSame;
    // const isBlackQueen = this.isBlack(this.cells[this.active]) === pos 

    if (isTheSame) {
      return;
    }

    if (
      (
        (this.currentMove === WHITE && isWhiteFromCell) ||
        (this.currentMove === BLACK && isBlackFromCell)
      ) && isSetActive && (
        isEmptyCell || (
          (isBlackFromCell && isWhiteToCell) ||
          (isWhiteFromCell && isBlackToCell))
      )
    ) {
      this.currentMove = !this.currentMove;
      this.cells[i] = this.cells[this.active]; // переместить фигуру
      this.cells[this.active] = ''; // очистка поля предидущей позиции
      if (this.isQueen(i, isBlackFromCell, isWhiteFromCell)) {
        if (this.isBlackPawn(this.cells[i])) {
          this.cells[i] = '♛'
        }
        if (this.isWhitePawn(this.cells[i])) {
          this.cells[i] = '♕'
        }
      }
      this.active = -1;


    }
    // если есть фигура, или клетка занята
    if (!isEmptyCell && (
      (this.currentMove === WHITE && isWhiteToCell) ||
      (this.currentMove === BLACK && isBlackToCell)
    )) {
      this.active = i;
    }
    // console.log({ c: this.cells, b: '' === this.cells[i], a: this.active });
    console.log({ move: i });

  }

  posArr: boolean[] = [];
  pos(i: number): boolean {
    const row = Math.floor(i / 8) % 2;
    const f = i % 2 == +(row === 0);
    return f;
  }
  isQueen(i: number, isBlackFromCell: boolean, isWhiteFromCell: boolean): boolean {
    return (0 <= i && i <= 7 && isBlackFromCell) || (isWhiteFromCell && 56 <= i && i <= 63);
  }
}
