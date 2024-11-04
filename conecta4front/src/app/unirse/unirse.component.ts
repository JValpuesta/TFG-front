import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartidaService } from '../services/partida.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-unirse',
  templateUrl: './unirse.component.html',
  styleUrls: ['./unirse.component.css']
})
export class UnirseComponent {

  idPartida: string = "";
  nombreJugador: string = "";

  errorMessage: string = '';

  constructor(private router: Router, private partidaService: PartidaService, private socket: SocketService) {
    
  }

  unirsePartida(){
    if(this.nombreJugador === "" || this.idPartida === ""){
      this.errorMessage = 'Por favor, completa ambos campos antes de unirte a la partida.';
    }
    else{
      this.partidaService.unirsePartida(Number(this.idPartida), this.nombreJugador)
      .then((res: any)  => {
        console.log("Comienza la partida")
        this.router.navigate(['/tablero'], {
          queryParams: { idPartida: this.idPartida, jugador: 2 }
        });
      })
      .catch(err => {
        console.log(err.status);
        if(err.status === 422){
          this.errorMessage = 'La partida ya esta empezada';
        }else{
          this.errorMessage = 'No existe una partida con ese ID';
        }
      })
    }
    
  }
}
