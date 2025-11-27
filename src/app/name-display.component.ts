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

interface ExpiringName {
  name: string;
  expiresAt: Date;
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

  private readonly colorPalette: ColorScheme[] = [
    { color: '#f87171', shadow: 'rgba(248, 113, 113, 0.5)' }, 
    { color: '#fbbf24', shadow: 'rgba(251, 191, 36, 0.5)' },  
    { color: '#a78bfa', shadow: 'rgba(167, 139, 250, 0.5)' }, 
    { color: '#34d399', shadow: 'rgba(52, 211, 153, 0.5)' },  
    { color: '#60a5fa', shadow: 'rgba(96, 165, 250, 0.5)' },  
    { color: '#fb923c', shadow: 'rgba(251, 146, 60, 0.5)' },  
    { color: '#f472b6', shadow: 'rgba(244, 114, 182, 0.5)' }, 
    { color: '#2dd4bf', shadow: 'rgba(45, 212, 191, 0.5)' },  
    { color: '#818cf8', shadow: 'rgba(30, 46, 195, 0.5)' }, 
    { color: '#facc15', shadow: 'rgba(146, 126, 45, 0.5)' }   
  ];

  private readonly permanentNames: string[] = ['MK TheBoss', 'Mohamed', 'Wafa', 
    'Fouad', 'Khawla', 'Soumaya', 'Lina', 'Youssef', 'Wala', 'Ikhlass'];
  
  private readonly nonPermanentNames: ExpiringName[] = [
    { name: 'MK TheBoss', expiresAt: new Date('2099-01-01T00:00:00Z') },
    { name: 'Siby', expiresAt: new Date('2023-10-26T00:00:00Z') },
    { name: 'Naïa', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Zoé', expiresAt: new Date('2023-01-01T00:00:00Z') },
    { name: 'Liam', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Kyrie Elijah', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Djibril', expiresAt: new Date('2023-05-20T00:00:00Z') },
    { name: 'Ornella', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Jonas', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Kiara', expiresAt: new Date('2023-11-15T00:00:00Z') },
    { name: 'Ava', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Mia', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Isabella', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Sophia', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Charlotte', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Amelia', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Evelyn', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Abigail', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Harper', expiresAt: new Date('2099-12-31T23:59:59Z' ) },
    { name: 'Emily', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Elizabeth', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Avery', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Sofia', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Ella', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Madison', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Scarlett', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Victoria', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Aria', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Grace', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Chloe', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Camila', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Penelope', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Riley', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Layla', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Lillian', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Nora', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Zoey', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Mila', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Aubrey', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Hannah', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Lily', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Addison', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Eleanor', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Natalie', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Luna', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Savannah', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Brooklyn', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Leah', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Zoe', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Stella', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Hazel', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Ellie', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Paisley', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Audrey', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Skylar', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Violet', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Claire', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Bella', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Aurora', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Lucy', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Anna', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Samantha', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Caroline', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Genesis', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Aaliyah', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Kennedy', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Kinsley', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Allison', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Maya', expiresAt: new Date('2099-12-31T23:59:59Z') },
    { name: 'Sarah', expiresAt: new Date('2099-12-31T23:59:59Z') }
  ];
  private selectedNonPermanentNames: string[] = [];

  constructor() {
    this.filterNonExpiredNames();
    const nameList = this.generateNameList();
    requestAnimationFrame(() => {
      this.names.set(this.generatePackedLayout(nameList));
    });
  }

  private filterNonExpiredNames(): void {
    const now = new Date();
    this.selectedNonPermanentNames = this.nonPermanentNames
      .filter(p => p.expiresAt > now)
      .map(p => p.name);
  }

  private generateNameList(): string[] {
    const first = this.selectedNonPermanentNames.length > 0 ? this.selectedNonPermanentNames[0] : this.permanentNames[0];
    const rest = [...this.permanentNames, ...this.selectedNonPermanentNames.slice(1, 40)];

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

    const fullPalette = [...this.colorPalette];
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
            textShadow: `0 0 8px ${colorScheme.shadow}, 0 0 16px ${colorScheme.shadow}, 0 0 20px ${colorScheme.shadow}`
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
