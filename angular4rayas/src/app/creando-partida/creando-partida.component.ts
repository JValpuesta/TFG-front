import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { PartidaService } from '../services/partida.service';

@Component({
  selector: 'app-creando-partida',
  templateUrl: './creando-partida.component.html',
  styleUrls: ['./creando-partida.component.css']
})
export class CreandoPartidaComponent{

  resultado: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private socket: SocketService, private partida: PartidaService) {
    this.route.paramMap.subscribe(params => {
      const resultadoParam = params.get('resultado');
      if (resultadoParam) {
        this.resultado = + resultadoParam;
      }
      this.socket.suscribe(`tablero/${this.resultado}`, (res: any) => {
        console.log("Mensaje recibido: " + res);
          this.router.navigate(['/tablero'], {
            queryParams: { idPartida: this.resultado, jugador: 1 }
          });
      })
    });
    
  }

  conectarse(){
    this.socket.suscribe(`1111`, (res: any) => {
      console.log("Mensaje recibido: " + res);
    })
  }
  

  borrarPartida(idPartida: number){
    this.partida.borrarPartida(idPartida)
    this.socket.unsubscribe();
  }
  
}
