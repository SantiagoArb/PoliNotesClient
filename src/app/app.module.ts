import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/util/login/login.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/util/navbar/navbar.component';
import { SidebarComponent } from './components/util/sidebar/sidebar.component';
import { FooterComponent } from './components/util/footer/footer.component';
import { RegistroComponent } from './components/usuario/registro/registro.component';
import { UsuariosComponent } from './components/usuario/usuarios/usuarios.component';
import { AsignaturasComponent } from './components/maestros/asignaturas/asignaturas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    RegistroComponent,
    UsuariosComponent,
    AsignaturasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
