export interface Tablero {
  idTablero: number;
  nombreJugador1: string;
  ipCliente1: string;
  nombreJugador2: string;
  ipCliente2: string;
  posicion: number[][];
  historial: number[];
  ganador: string | null;
  turno: number;
}
