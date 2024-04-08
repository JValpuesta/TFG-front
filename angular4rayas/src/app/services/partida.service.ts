import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  apiUrl = "http://localhost:5435"

  constructor(private http: HttpClient) { }

  generarCombinacion(longitud: number): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let combinacion = '';
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      combinacion += caracteres.charAt(indice);
    }
    return combinacion;
  }

  async obtenerIP() {
    try {
      const response = await this.http.get<any>('https://api.ipify.org/?format=json').toPromise()
      console.log("La IP es: " + response.ip);
      return response.ip;
    } catch (error) {
      console.error('Error al obtener la IP:', error);
      throw error;
    }
  }

  async crearPartida() {
    const nombreJugador = (document.getElementById('input-nombre') as HTMLInputElement).value;
    const ipJugador = await this.obtenerIP();
    const urlBackend = `${this.apiUrl}/partida?nombre=${nombreJugador}&ip=${ipJugador}`;
    return this.http.post<any>(urlBackend, undefined).toPromise();
  }

  async unirsePartida(idPartida: number, nombreJugador: string){
    const ipJugador = await this.obtenerIP();
    const urlBackend = `${this.apiUrl}/partida/${idPartida}?nombre2=${nombreJugador}&ip2=${ipJugador}`;
    return this.http.put<any>(urlBackend, undefined).toPromise();
  }

  async aniadirFicha(idPartida: number,column: number,jugador: number){
    const urlBackend = `${this.apiUrl}/partida/conecta4/${idPartida}?columna=${column}&idJugador=${jugador}`;
    return this.http.put<any>(urlBackend, undefined).toPromise();
  }

  async borrarPartida(idPartida: number) {
    const urlBackend = `${this.apiUrl}/partida/${idPartida}`;
    return this.http.delete<any>(urlBackend, undefined).toPromise();
  }

  async getHistorial(){
    const ipJugador = await this.obtenerIP();
    const urlBackend = `${this.apiUrl}/partida/perfil/${ipJugador}`;
    return this.http.get<any>(urlBackend, undefined).toPromise();
  }
}
