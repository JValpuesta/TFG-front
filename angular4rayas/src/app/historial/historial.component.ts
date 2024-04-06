import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartidaService } from '../services/partida.service';
import { Tablero } from '../model/tablero';
import { TableroComponent } from '../tablero/tablero.component';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})

export class HistorialComponent {
  registro: Array<Tablero> = new Array();
  constructor(private route: Router, private partida: PartidaService, private socket: SocketService){
    this.socket.suscribe(`historial/`, (res: any) => {
      console.log("Mensaje recibido: " + res);
      this.registro = JSON.parse(res) as Array<Tablero>;;
    })
    this.getHistorial();
  }

  getHistorial(){
    console.log(this.partida.getHistorial())
  }

}
