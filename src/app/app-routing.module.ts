import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/util/login/login.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/usuario/registro/registro.component';
import { UsuariosComponent } from './components/usuario/usuarios/usuarios.component';
import { AsignaturasComponent } from './components/maestros/asignaturas/asignaturas.component';
import { EstudianteComponent } from './components/usuario/estudiante/estudiante.component';

import { BarrasComponent } from './components/maestros/graficos/barras/barras.component';
import { DonasComponent } from './components/maestros/graficos/donas/donas.component';
import { GeneralInfoComponent } from './components/maestros/general-info/general-info.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'users', component: UsuariosComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'materias', component: AsignaturasComponent },
  { path: 'mismaterias', component: EstudianteComponent },
  { path: 'grafica/barras',component: BarrasComponent},
  { path: 'grafica/donas',component: DonasComponent },
  { path: 'infomaterias', component: GeneralInfoComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
