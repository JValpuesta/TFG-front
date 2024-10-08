import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { NuevaComponent } from './nueva/nueva.component';
import { CreandoPartidaComponent } from './creando-partida/creando-partida.component';
import { UnirseComponent } from './unirse/unirse.component';
import { TableroComponent } from './tablero/tablero.component';
import { PartidasEmpezadasComponent } from './reglas/reglas.component';
import { JugarBotComponent } from './jugar-bot/jugar-bot.component';
import { TableroBotComponent } from './tablero-bot/tablero-bot.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'creando-partida/:resultado', component: CreandoPartidaComponent },
  {path: 'unirse', component: UnirseComponent },
  {path: 'tablero', component: TableroComponent },
  {path: 'nueva', component: NuevaComponent},
  {path: 'partidas', component: PartidasEmpezadasComponent},
  {path: 'bot', component: JugarBotComponent },
  {path: 'bot/:id', component: TableroBotComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
