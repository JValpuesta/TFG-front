import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jugar-bot',
  templateUrl: './jugar-bot.component.html',
  styleUrls: ['./jugar-bot.component.css']
})
export class JugarBotComponent {
  nombre: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  jugar() {
    if (this.nombre.trim()) {
      this.router.navigate(['/juego-bot'], { queryParams: { nombre: this.nombre } });
    } else {
      alert('Por favor, introduce tu nombre.');
    }
  }
}
