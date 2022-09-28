import { NgModule, RendererFactory2 } from '@angular/core';
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
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './componentes/form/form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './paginas/login/login.component';

import { FormreceitasComponent } from './componentes/formreceitas/formreceitas.component';
import { FormdespesasdeleteComponent } from './componentes/formdespesasdelete/formdespesasdelete.component';
import { FormreceitasdeleteComponent } from './componentes/formreceitasdelete/formreceitasdelete.component';
import { ControledespesasComponent } from './paginas/controledespesas/controledespesas.component';
import { ControlereceitasComponent } from './paginas/controlereceitas/controlereceitas.component';
import { NotfoundComponent } from './paginas/notfound/notfound.component';
import { EmconstrucaoComponent } from './paginas/emconstrucao/emconstrucao.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraficoPizzaComponent } from './componentes/grafico-pizza/grafico-pizza.component';
import { FormalteradespesasComponent } from './componentes/formalteradespesas/formalteradespesas.component';
import { FormalterareceitasComponent } from './componentes/formalterareceitas/formalterareceitas.component';
import { CustomMatPaginatorIntl } from './service/custominitl';
import { KaizenService } from './service/kaizen.service';
import { AuthService } from './service/auth.service';
import { AlertModalComponent } from './service/alert/alert-modal/alert-modal.component';
import { AlertmodalService } from './service/alert/alertmodal.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarregandoComponent } from './componentes/carregando/carregando.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { LandingpageComponent } from './paginas/landingpage/landingpage.component'
import { DataTablesModule } from "angular-datatables";
import * as $ from "jquery";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CardsTotaisComponent,
    AbasHomeComponent,
    TabelaComponent,
    FormComponent,
    LoginComponent,
    FormreceitasComponent,
    FormdespesasdeleteComponent,
    FormreceitasdeleteComponent,
    ControledespesasComponent,
    ControlereceitasComponent,
    NotfoundComponent,
    EmconstrucaoComponent,
    GraficoPizzaComponent,
    FormalteradespesasComponent,
    FormalterareceitasComponent,
    AlertModalComponent,
    CarregandoComponent,
    LandingpageComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgxChartsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    DataTablesModule,
    //Imports Material
    
    MatTableModule,
    MatSliderModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatCardModule,
    
    
    
  ],
    
    providers: [AbasHomeComponent,
                KaizenService,
                AuthService,
                AlertmodalService ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(library:FaIconLibrary){
    library.addIcons(fa0)
  }
}
