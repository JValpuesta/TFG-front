import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { PartidaService } from '../services/partida.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Tablero } from '../model/tablero';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit{
  fila!: number;
  columna!: number;
  
  id: number = 0;
  jugador: number = 0;
  tablero!: Tablero;
  ganador: boolean = false;

  constructor(private route: ActivatedRoute, private socket: SocketService, private partidaService: PartidaService,private spinner: NgxSpinnerService) {
    this.route.queryParams.subscribe(params => {
      const idParam = params['idPartida'];
      this.jugador = params['jugador']
      if (idParam) {
        this.id = + idParam;
      }
    });
    if(this.jugador == 2){
      this.spinner.show()
    }
  }

  tableroAntiguo!: number[][]
  tableroNuevo!: number[][]

  ngOnInit() {
    this.socket.suscribe(`tablero/${this.id}/${this.jugador}`, (res: any) => {
      console.log("Mensaje recibido: " + res);
      var tableroo: Tablero = JSON.parse(res) as Tablero;
      
        this.spinner.hide()
        if(this.tablero == undefined){
          this.tableroAntiguo = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
          ];
        }else{
          this.tableroAntiguo = this.tablero.posicion
        }
        this.tablero = JSON.parse(res) as Tablero;
        this.tableroNuevo = this.tablero.posicion

        for (let i = 0; i < this.tableroAntiguo.length; i++) {
          for (let j = 0; j < this.tableroAntiguo[0].length; j++) {
            if (this.tableroAntiguo[i][j] === 1 || this.tableroAntiguo[i][j] === 2) {
              this.tableroAntiguo[i][j] = 0;
            } else if (this.tableroAntiguo[i][j] === 0) {
              this.tableroAntiguo[i][j] = this.tableroNuevo[i][j];
            }
          }
        }

        var columns = document.querySelectorAll('.column');

        this.tableroAntiguo.forEach((fila, filaIndex) => {
          fila.forEach((columna, columnaIndex) => {
              if(columna == 1){
                const disc = document.createElement('div'); 
                disc.classList.add('disc', 'red');  
                columns[columnaIndex].appendChild(disc)
              }
              if(columna == 2){
                const disc = document.createElement('div'); 
                disc.classList.add('disc', 'yellow');  
                columns[columnaIndex].appendChild(disc)
              }
        })     
      })
      if(tableroo.ganador != ''){
        this.hayGanador(tableroo)
      }
    })
  }
  
      
  oneClick = 0;

  cosas(column: HTMLElement) {
    if(this.ganador == false){
      this.spinner.hide();
    
      this.oneClick++;
      var divs = column.querySelectorAll('div');
      var count = divs.length;
  
      if (this.jugador == 2) {
        const disc = document.createElement('div'); 
        disc.classList.add('disc', 'yellow');  
        column.appendChild(disc);
      } else {
        const disc = document.createElement('div');  
        disc.classList.add('disc', 'red');  
        column.appendChild(disc);
      }
  
      this.partidaService.aniadirFicha(this.id,Number(column.id),this.jugador)
        .then((res: Tablero)  => {
          this.spinner.show();
          if(res.ganador != ''){
            this.hayGanador(res)
          }
          this.tablero = res;
        })
        .catch(err => {
          console.log(err)
        })       
      
    }
  }

  hayGanador(tablero: Tablero){
    this.spinner.hide();
    var titulo = document.getElementById("tituloTablero")
    var botonTitulo = document.getElementById("botonTitulo")
    var pyro = document.getElementById("pyro")

    if(titulo && botonTitulo && pyro){
      titulo.innerHTML = "El ganador es: " + tablero.ganador;
      titulo.style.marginLeft = "200px";
      botonTitulo.style.visibility = "visible";
      pyro.style.visibility = "visible";

    }
    this.ganador = true
  }
}
