import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  // Variables pour suivre l'état du glissement
  private dragging = false;
  private startX = 0;
  private startY = 0;
  private initialX = 0;
  private initialY = 0;
  public currentX = 0;
  public currentY = 0;
  elementRef: any;

  // Écouteur d'événements pour le début du glissement
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.dragging = true; // Commence le glissement
    this.startX = event.clientX; // Enregistre la position de départ
    this.startY = event.clientY;
    this.initialX = this.currentX; // Enregistre la position initiale
    this.initialY = this.currentY;
  }
  
  // Écouteur d'événements pour le mouvement de la souris
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.dragging) { // Si on ne glisse pas, on ne fait rien
      return;
    }

    // Calcule la nouvelle position
    this.currentX = this.initialX + event.clientX - this.startX;
    this.currentY = this.initialY + event.clientY - this.startY;

    // Met à jour la position de la pièce de jeu
    const gamePiece = this.elementRef.nativeElement.querySelector('#game-piece');
    if (gamePiece) {
      gamePiece.style.transformOrigin = 'center'; // Change le point d'origine de la transformation
      gamePiece.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`; // Applique la transformation
    }
  }

  // Écouteur d'événements pour la fin du glissement
  @HostListener('mouseup')
  onMouseUp() {
    this.dragging = false; // Arrête le glissement

    // Calcule la taille de la case
    const caseSize = 100;

    // Calcule la position de la case la plus proche
    const closestRow = Math.round(this.currentY / caseSize) * caseSize;
    const closestCol = Math.round(this.currentX / caseSize) * caseSize;

    // Déplace la pièce de jeu à la position de la case la plus proche
    this.currentX = closestCol;
    this.currentY = closestRow;

    // Met à jour la position de la pièce de jeu
    const gamePiece = this.elementRef.nativeElement.querySelector('#game-piece');
    if (gamePiece) {
      gamePiece.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`; // Applique la transformation
    }
  }
}