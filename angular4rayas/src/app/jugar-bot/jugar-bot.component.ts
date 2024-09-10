import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartidaService } from '../services/partida.service';

@Component({
  selector: 'app-jugar-bot',
  templateUrl: './jugar-bot.component.html',
  styleUrls: ['./jugar-bot.component.css']
})
export class JugarBotComponent {
  idPartida: number = 0;
  errorMessage: string = '';
  nombre = '';

  constructor(private router: Router, private partidaService: PartidaService) {}

  jugar() {
    this.nombre = (document.getElementById('input-nombre') as HTMLInputElement).value.trim();
    if (this.nombre === "") {
      this.errorMessage = 'Por favor, añade un nombre antes de jugar contra el bot.';
    } else {
      this.partidaService.jugarBot()
        .then((res: any) => {
          console.log(res);
          this.idPartida = res.idTablero;
          this.router.navigate(['/bot', this.idPartida]);
        })
        .catch(err => {
          console.log(err);
          this.errorMessage = 'Error al iniciar la partida. Inténtalo de nuevo.';
        });
    }
  }
  
}
