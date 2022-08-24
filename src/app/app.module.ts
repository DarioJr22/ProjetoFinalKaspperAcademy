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
import { MatTable, MatTableModule } from "@angular/material/table";
import { MatSlider, MatSliderModule } from "@angular/material/slider";
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './componentes/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CardsTotaisComponent,
    AbasHomeComponent,
    TabelaComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatSliderModule,
    MatPaginatorModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(library:FaIconLibrary){
    library.addIcons(fa0)
  }
}
