import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StyledName {
  name: string;
  className: string;
  style: { [key: string]: string };
}

interface WordRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ColorScheme {
    color: string;
    shadow: string;
}

@Component({
  selector: 'app-name-display',
  imports: [CommonModule],
  template: `
    <div class="container">
      @for(name of names(); track name.name) {
        <span [class]="name.className" [style]="name.style">{{ name.name }}</span>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
      position: relative;
      overflow: hidden;
      background: radial-gradient(ellipse at center, #333 0%, #111 100%);
    }

    .container {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .name {
      position: absolute;
      font-family: 'Orbitron', sans-serif;
      font-weight: bold;
      white-space: nowrap;
      user-select: none;
      animation: fadeIn 0.8s ease-in-out;
      transition: top 0.5s ease, left 0.5s ease, color 0.5s ease, text-shadow 0.5s ease;
      will-change: transform, top, left;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameDisplayComponent {
  names = signal<StyledName[]>([]);

  private readonly primaryColor: ColorScheme = { color: '#f87171', shadow: 'rgba(248, 113, 113, 0.6)' }; // Red-Orange
  private readonly colorPalette: ColorScheme[] = [
    { color: '#fbbf24', shadow: 'rgba(251, 191, 36, 0.6)' },   // Amber
    { color: '#a78bfa', shadow: 'rgba(167, 139, 250, 0.6)' }, // Violet
    { color: '#34d399', shadow: 'rgba(52, 211, 153, 0.6)' },   // Emerald
    { color: '#60a5fa', shadow: 'rgba(96, 165, 250, 0.6)' },    // Blue
  ];

  private readonly permanentNames: string[] = ['MK TheBoss', 'Mohamed', 'Wafa', 
    'Fouad', 'Khawla', 'Soumaya', 'Lina', 'Youssef', 'Wala', 'Ikhlass'];
  private readonly nonPermanentNames: string[] = ['MK TheBoss', 'Siby', 'Naïa', 
    'Zoé', 'Liam', 'Kyrie Elijah', 'Djibril', 'Ornella', 'Jonas', 'Kiara'];

  constructor() {
    const nameList = this.generateNameList();
    requestAnimationFrame(() => {
      this.names.set(this.generatePackedLayout(nameList));
    });
  }

  private generateNameList(): string[] {
    const first = this.nonPermanentNames[0];
    const rest = [...this.permanentNames, ...this.nonPermanentNames.slice(1, 40)];

    for (let i = rest.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rest[i], rest[j]] = [rest[j], rest[i]];
    }

    return [first, ...rest];
  }

  private generatePackedLayout(list: string[]): StyledName[] {
    if (!list || list.length === 0) return [];

    const placedRects: WordRect[] = [];
    const styledNames: StyledName[] = [];
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    const fullPalette = [this.primaryColor, ...this.colorPalette];
    for (let i = fullPalette.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [fullPalette[i], fullPalette[j]] = [fullPalette[j], fullPalette[i]];
    }

    const totalArea = containerWidth * containerHeight * 0.9;
    const weights = list.map((_, i) => 1 / Math.pow(i + 1, 1.5));
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    
    const FONT_ASPECT_RATIO_MULTIPLIER = 0.6; 
    const FONT_HEIGHT_MULTIPLIER = 1.2;

    for (let i = 0; i < list.length; i++) {
      const name = list[i];
      const cardArea = totalArea * (weights[i] / totalWeight);
      const textAspectRatio = name.length * FONT_ASPECT_RATIO_MULTIPLIER;
      const cardAspectRatio = Math.max(1, textAspectRatio);

      let currentCardHeight = Math.sqrt(cardArea / cardAspectRatio);
      let currentCardWidth = currentCardHeight * cardAspectRatio;
      let currentFontSizePx = currentCardHeight / FONT_HEIGHT_MULTIPLIER;

      if (currentCardWidth > containerWidth) {
        const scaleDownFactor = (containerWidth / currentCardWidth); 
        currentCardWidth = currentCardWidth * scaleDownFactor;
        currentCardHeight = currentCardHeight * scaleDownFactor;
        currentFontSizePx = currentFontSizePx * scaleDownFactor;
      }

      let bestPos: { x: number; y: number } | null = null;

      let placementAttempt = 0;
      while (bestPos === null && placementAttempt < 10) {
        if (i === 0) {
            bestPos = { x: containerWidth / 2, y: containerHeight / 2 };
            break;
        }

        let spiralAngle = Math.random() * 2 * Math.PI;
        let spiralRadius = Math.min(currentCardWidth, currentCardHeight) * 0.5;
        let searchAttempts = 0;
        const maxSearchAttempts = 3000;

        while (searchAttempts < maxSearchAttempts) {
          const x = containerWidth / 2 + Math.cos(spiralAngle) * spiralRadius;
          const y = containerHeight / 2 + Math.sin(spiralAngle) * spiralRadius;
          const newRect: { x: number; y: number; width: number; height: number; } = { x: x - currentCardWidth / 2, y: y - currentCardHeight / 2, width: currentCardWidth, height: currentCardHeight };

          if (!this.checkCollision(newRect, placedRects) && this.isInBounds(newRect, containerWidth, containerHeight)) {
            bestPos = { x, y };
            break;
          }
          
          spiralAngle += 0.25;
          spiralRadius += 1;
          searchAttempts++;
        }

        if (bestPos === null) {
          placementAttempt++;
          currentCardHeight *= 0.95;
          currentCardWidth *= 0.95;
          currentFontSizePx *= 0.95;
        }
      }

      if (bestPos) {
        const finalRect: WordRect = { x: bestPos.x - currentCardWidth / 2, y: bestPos.y - currentCardHeight / 2, width: currentCardWidth, height: currentCardHeight };
        placedRects.push(finalRect);

        const colorScheme = fullPalette[i % fullPalette.length];
        const sanitizedClassName = name.replace(/\s+/g, '-').toLowerCase();

        styledNames.push({
          name,
          className: `name ${sanitizedClassName}`,
          style: {
            top: `${bestPos.y}px`,
            left: `${bestPos.x}px`,
            width: `${currentCardWidth}px`,
            height: `${currentCardHeight}px`,
            fontSize: `${currentFontSizePx}px`,
            transform: 'translate(-50%, -50%)',
            color: colorScheme.color,
            textShadow: `0 0 8px ${colorScheme.shadow}, 0 0 16px ${colorScheme.shadow}, 0 0 24px ${colorScheme.shadow}`
          },
        });
      } else {
          console.warn('Could not place word after multiple retries:', name);
      }
    }
    return styledNames;
  }

  private checkCollision(rect: WordRect, others: WordRect[]): boolean {
    const margin = 5;
    for (const other of others) {
      if (rect.x < other.x + other.width + margin && rect.x + rect.width + margin > other.x && rect.y < other.y + other.height + margin && rect.y + rect.height + margin > other.y) {
        return true;
      }
    }
    return false;
  }

  private isInBounds(rect: WordRect, containerWidth: number, containerHeight: number): boolean {
    return rect.x >= 0 && rect.x + rect.width <= containerWidth && rect.y >= 0 && rect.y + rect.height <= containerHeight;
  }
}
