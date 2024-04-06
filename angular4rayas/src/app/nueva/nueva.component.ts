import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PartidaService } from '../services/partida.service';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaComponent {

  idPartida: number = 0;
  errorMessage: string = '';
  constructor(private router: Router, private partidaService: PartidaService) {
    
  }

 crearPartida(){
    const nombreJugador = (document.getElementById('input-nombre') as HTMLInputElement).value.trim();
    if(nombreJugador === ""){
      this.errorMessage = 'Por favor, añade un nombre antes de unirte a la partida.';
    }
    else{
      this.partidaService.crearPartida()
      .then((res: any)  => {
        console.log(res)
        this.idPartida = res.idTablero;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.router.navigate(['creando-partida/'+ this.idPartida])
      });
    }
  }
}