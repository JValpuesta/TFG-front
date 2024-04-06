import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { NuevaComponent } from './nueva/nueva.component';
import { CreandoPartidaComponent } from './creando-partida/creando-partida.component';
import { UnirseComponent } from './unirse/unirse.component';
import { TableroComponent } from './tablero/tablero.component';
import { PartidasEmpezadasComponent } from './partidas-empezadas/partidas-empezadas.component';
import { HistorialComponent } from './historial/historial.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'creando-partida/:resultado', component: CreandoPartidaComponent },
  {path: 'unirse', component: UnirseComponent },
  {path: 'tablero', component: TableroComponent },
  {path: 'nueva', component: NuevaComponent},
  {path: 'partidas', component: PartidasEmpezadasComponent},
  {path: 'historial', component: HistorialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
