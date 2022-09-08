import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControledespesasComponent } from './paginas/controledespesas/controledespesas.component';
import { ControlereceitasComponent } from './paginas/controlereceitas/controlereceitas.component';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';
import { NotfoundComponent } from './paginas/notfound/notfound.component';

const routes: Routes = [
  {path:'Home', component:HomeComponent},
  {path:'ControleDespesas', component:ControledespesasComponent},
  {path:'ControleReceitas', component:ControlereceitasComponent},
  {path:'', component:LoginComponent},
  {path:'**', component:NotfoundComponent}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
