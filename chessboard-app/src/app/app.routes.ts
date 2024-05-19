import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { GameBoardComponent } from './game-board/game-board.component';

export const routes: Routes = [
    { path: 'test', component: TestComponent },
    { path: 'gameboard', component: GameBoardComponent }
];
