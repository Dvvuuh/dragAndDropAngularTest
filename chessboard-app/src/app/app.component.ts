import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GameBoardComponent } from "./game-board/game-board.component";
import { TestComponent } from "./test/test.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, GameBoardComponent, TestComponent]
})
export class AppComponent {
  title = 'chessboard-app';
}
