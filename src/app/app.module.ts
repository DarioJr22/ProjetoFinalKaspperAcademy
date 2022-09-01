import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './paginas/home/home.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fa0 } from '@fortawesome/free-solid-svg-icons';
import { CardsTotaisComponent } from './componentes/cards-totais/cards-totais.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbasHomeComponent } from './componentes/abas-home/abas-home.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from "@angular/material/table";
import { MatSliderModule } from "@angular/material/slider";
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './componentes/form/form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './paginas/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CardsTotaisComponent,
    AbasHomeComponent,
    TabelaComponent,
    FormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSliderModule,
    MatFormFieldModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(library:FaIconLibrary){
    library.addIcons(fa0)
  }
}
