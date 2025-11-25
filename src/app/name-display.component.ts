import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StyledName {
  name: string;
  style: {
    top: string;
    left: string;
    fontSize: string;
    transform: string;
  };
}

@Component({
  selector: 'app-name-display',
  imports: [CommonModule],
  template: `
    <div class="container">
      @for(name of names(); track name.name) {
        <span class="name" [style]="name.style">{{ name.name }}</span>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      background-color: #1a1a1a;
    }

    .container {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    .name {
      position: absolute;
      color: white;
      font-family: 'Orbitron', sans-serif;
      font-weight: bold;
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3);
      white-space: nowrap;
      user-select: none;
      animation: fadeIn 1s ease-in-out, drift 20s infinite linear alternate;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }

    @keyframes drift {
      from { transform: translate(-5%, -5%); }
      to { transform: translate(5%, 5%); }
    }

    .name:nth-child(1) {
      animation: fadeIn 1s ease-in-out, pulse 5s infinite ease-in-out;
    }

    @keyframes pulse {
      0%, 100% { text-shadow: 0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3); }
      50% { text-shadow: 0 0 20px rgba(0, 255, 255, 1), 0 0 30px rgba(0, 255, 255, 0.7), 0 0 40px rgba(0, 255, 255, 0.5); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameDisplayComponent {
  names = signal<StyledName[]>([]);

  constructor() {
    const nameList = [
      'MK TheBoss', 'Shadow', 'CyberNinja', 'Vortex', 'Blaze', 'Quantum', 
      'Serenity', 'Rogue', 'Phoenix', 'Obsidian', 'Stardust', 'Mirage'
    ];

    this.names.set(nameList.map((name, index) => {
      if (index === 0) {
        return {
          name,
          style: {
            top: '50%',
            left: '50%',
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            transform: 'translate(-50%, -50%)',
          },
        };
      } else {
        return {
          name,
          style: {
            top: `${Math.random() * 90 + 5}%`,
            left: `${Math.random() * 90 + 5}%`,
            fontSize: `${Math.max(1, 8 - index * 0.5)}rem`,
            transform: `translate(-${Math.random() * 100}%, -${Math.random() * 100}%)`,
          },
        };
      }
    }));
  }
}
