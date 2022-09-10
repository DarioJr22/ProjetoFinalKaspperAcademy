import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControledespesasComponent } from './paginas/controledespesas/controledespesas.component';
import { ControlereceitasComponent } from './paginas/controlereceitas/controlereceitas.component';
import { EmconstrucaoComponent } from './paginas/emconstrucao/emconstrucao.component';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';
import { NotfoundComponent } from './paginas/notfound/notfound.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'controledespesas', component:ControledespesasComponent},
  {path:'controlereceitas', component:ControlereceitasComponent},
  {path:'emconstrucao', component:EmconstrucaoComponent},
  {path:'**', component:NotfoundComponent},
  
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
