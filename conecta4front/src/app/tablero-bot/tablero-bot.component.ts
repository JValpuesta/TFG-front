import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PartidaService } from '../services/partida.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tablero-bot',
  templateUrl: './tablero-bot.component.html',
  styleUrls: ['./tablero-bot.component.css']
})
export class TableroBotComponent implements OnInit {

  id!: number;  // ID de la partida
  jugador!: number;  // Jugador actual
  tablero: any[] = [];  // Representación del tablero
  @ViewChild('tabla') tabla!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partidaService: PartidaService,
    private cdRef: ChangeDetectorRef
  ) {
    // Inicialización del ID y del jugador desde los parámetros de la ruta
    this.route.params.subscribe(params => {
      this.id = +params['id'];  // Obtiene el ID de la partida desde la ruta
    });
  }

  ngOnInit(): void {
    this.inicializarTablero();  // Inicializa el tablero vacío al cargar el componente
  }

  inicializarTablero(): void {
    // Inicializa el tablero como un array de 7 columnas y 6 filas
    this.tablero = Array(7).fill(0).map(() => Array(6).fill(0));
  }

  async aniadirFicha(columna: HTMLElement): Promise<void> {
    const columnaNumero = Number(columna.id.replace('col-', ''));
    this.agregarFichaVisual(columnaNumero, 1); // Agrega la ficha del jugador en el frontend

    try {
      // Llama al método del service para interactuar con el backend y añade una ficha
      const respuesta = await this.partidaService.aniadirFichaBot(this.id, columnaNumero);
      if (respuesta.ganador != null) {
        this.hayGanador(respuesta)
      }
      this.actualizarTablero(respuesta);  // Actualiza el tablero visualmente
    } catch (error) {
      console.error('Error al añadir ficha: ', error);
    }
  }

  agregarFichaVisual(columna: number, jugador: number): void {
    const columnaElement = this.tabla.nativeElement.querySelector(`#col-${columna}`);
    if (columnaElement) {
      const filas = columnaElement.querySelectorAll('li');
      // Encuentra la primera fila vacía
      for (let i = filas.length - 1; i >= 0; i--) {
        const filaElement = filas[i];
        if (filaElement.classList.contains('vacio')) {
          const disc = this.tabla.nativeElement.createElement('div');
          disc.classList.add('disc', jugador === 1 ? 'ficha-jugador-1' : 'ficha-jugador-2');
          filas[i].appendChild(disc);
          break;
        }
      }
    }
  }

  actualizarTablero(nuevoTablero: any): void {
    // Actualiza el tablero en el frontend con los datos del backend
    this.tablero = this.transponerArray(nuevoTablero.posicion);
    this.renderizarTablero();
  }

  renderizarTablero(): void {
    const tablaElement = this.tabla.nativeElement;
    for (let col = 0; col < 7; col++) {
      const columnaElement = tablaElement.querySelector(`#col-${col}`);
      if (columnaElement) {
        const filas = columnaElement.querySelectorAll('li');

        this.tablero[col].forEach((ficha: number, filaIndex: number) => {
          const filaElement = filas[filaIndex];
          if (filaElement) {
            filaElement.classList.remove('ficha-jugador-1', 'ficha-jugador-2', 'caida');
            if (ficha === 1) {
              filaElement.classList.add('ficha-jugador-1');
            } else if (ficha === 2) {
              filaElement.classList.add('ficha-jugador-2');
            }
            filaElement.classList.add('caida');
          }
        });
      }
    }
  }

  transponerArray(tableroDeFilas: number[][]): number[][] {
    const columnas: number[][] = [];
    for (let col = 0; col < 7; col++) {
      const columna: number[] = [];
      for (let fila = 0; fila < 6; fila++) {
        columna.push(tableroDeFilas[fila][col]);
      }
      columnas.push(columna);
    }

    return columnas;
  }

  volverAlMenu(): void {
    this.router.navigate(['/']);
  }

  async hayGanador(tablero: { ganador: any; user1: number; user2: number; }) {
    const titulo = document.getElementById("tituloTablero");
    const botonTitulo = document.getElementById("botonTitulo");
    const pyro = document.getElementById("pyro");
    if (titulo && botonTitulo && pyro) {
      try {
        switch (tablero.ganador) {
          case "PLAYER_1": titulo.innerHTML = "El ganador es: " + await this.obtenerUsername(tablero.user1);
            break;
          case "PLAYER_2": titulo.innerHTML = "El ganador es: " + await this.obtenerUsername(tablero.user2);
            break;
          default: titulo.innerHTML = "Empate ¡Todos ganan!";
            break;
        }
        titulo.style.marginLeft = "200px";
        botonTitulo.style.visibility = "visible";
        pyro.style.visibility = "visible";

      } catch (error) {
        console.error("Error al obtener el nombre del ganador:", error);
      }
    }
  }

  async obtenerUsername(idJugador: number): Promise<string> {
    try {
      const jugador = await this.partidaService.obtenerJugador(idJugador);
      if (jugador && jugador.username) {
        return jugador.username;
      } else {
        throw new Error("El jugador no tiene un username.");
      }
    } catch (error) {
      console.error("Error al obtener el username del jugador:", error);
      throw error;
    }
  }
}
