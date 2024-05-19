import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {
  rows = Array(4).fill(0);
  cols = Array(4).fill(0);

  piecePositions: { [id: string]: { row: number; col: number } } = {
    piece1: { row: 0, col: 0 },
    piece2: { row: 0, col: 1 },
  };

  getColor(row: number, col: number): string {
    return (row + col) % 2 === 0 ? 'black' : 'white';
  }

  private findPieceAtPosition(row: number, col: number): string | null {
    for (const [id, position] of Object.entries(this.piecePositions)) {
      if (position.row === row && position.col === col) {
        return id;
      }
    }
    return null;
  }

  onDragStarted(event: any) {
    const pieceElement = event.source.element.nativeElement;
    pieceElement.style.zIndex = '1000';
  }

  onDragEnd(event: CdkDragEnd<any>) {
    const pieceElement = event.source.element.nativeElement;
    pieceElement.style.zIndex = '1';

    const { x, y } = event.source.getFreeDragPosition();
    const cellSize = 100;
    const boardElement = event.source.element.nativeElement.parentElement;

    let relativeX = x;
    let relativeY = y;

    if (boardElement) {
      const boardRect = boardElement.getBoundingClientRect();
      relativeX = x - boardRect.left;
      relativeY = y - boardRect.top;
    }

    const newCol = Math.floor((relativeX + cellSize / 2) / cellSize);
    const newRow = Math.floor((relativeY + cellSize / 2) / cellSize);

    if (newRow >= 0 && newRow < this.rows.length && newCol >= 0 && newCol < this.cols.length) {
      const pieceSize = 100;
      const centerX = newCol * cellSize + cellSize / 2 - pieceSize / 2;
      const centerY = newRow * cellSize + cellSize / 2 - pieceSize / 2;

      const currentPieceId = event.source.data.id;
      const targetPieceId = this.findPieceAtPosition(newRow, newCol);

      if (targetPieceId && targetPieceId !== currentPieceId) {
        const temp = this.piecePositions[currentPieceId];
        this.piecePositions[currentPieceId] = this.piecePositions[targetPieceId];
        this.piecePositions[targetPieceId] = temp;

        const currentPieceElement = document.getElementById(currentPieceId);
        const targetPieceElement = document.getElementById(targetPieceId);

        if (currentPieceElement && targetPieceElement) {
          currentPieceElement.style.transform = `translate(${this.piecePositions[currentPieceId].col * cellSize}px, ${this.piecePositions[currentPieceId].row * cellSize}px)`;
          targetPieceElement.style.transform = `translate(${this.piecePositions[targetPieceId].col * cellSize}px, ${this.piecePositions[targetPieceId].row * cellSize}px)`;
        }
      } else {
        this.piecePositions[currentPieceId] = { row: newRow, col: newCol };
        event.source.setFreeDragPosition({ x: centerX, y: centerY });
      }
    }
  }
}
