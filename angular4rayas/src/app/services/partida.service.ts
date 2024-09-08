import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  apiUrl = "http://localhost:9023/v1"

  constructor(private http: HttpClient) { }

  async obtenerIP() {
    try {
      const response = await firstValueFrom(this.http.get<any>('https://api.ipify.org/?format=json'))
      console.log("La IP es: " + response.ip);
      return response.ip;
    } catch (error) {
      console.error('Error al obtener la IP: ', error);
      throw error;
    }
  }

  async crearPartida() {
    const nombreJugador = (document.getElementById('input-nombre') as HTMLInputElement).value;
    const ipJugador = await this.obtenerIP();
    const urlBackend = `${this.apiUrl}/partida`;
    const body = {
      username: nombreJugador,
      ip: ipJugador
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.post<any>(urlBackend, body, { headers }));
  }

  async unirsePartida(idPartida: number, nombreJugador: string) {
    const ipJugador = await this.obtenerIP();
    const userInputDto = {
      username: nombreJugador,
      ip: ipJugador
    };
    const urlBackend = `${this.apiUrl}/partida/${idPartida}`;
    return firstValueFrom(this.http.put<any>(urlBackend, userInputDto));
  }  

  async aniadirFicha(idPartida: number,column: number,jugador: number){
    const urlBackend = `${this.apiUrl}/partida/conecta4/${idPartida}?columna=${column}&idJugador=${jugador}`;
    return firstValueFrom(this.http.put<any>(urlBackend, undefined));
  }

  async borrarPartida(idPartida: number) {
    const urlBackend = `${this.apiUrl}/partida/${idPartida}`;
    return firstValueFrom(this.http.delete<any>(urlBackend, undefined));
  }

  async obtenerJugador(idJugador: number) {
    const urlBackend = `${this.apiUrl}/user/${idJugador}`;
    return firstValueFrom(this.http.get<any>(urlBackend));
  }
}
