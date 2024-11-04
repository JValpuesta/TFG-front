export interface Tablero {
  idTablero: number;
  user1: number;
  user2: number;
  posicion: number[][];
  ganador: string | null;
  turno: number;
}