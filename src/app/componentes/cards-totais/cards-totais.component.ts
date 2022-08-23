import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-totais',
  templateUrl: './cards-totais.component.html',
  styleUrls: ['./cards-totais.component.css']
})
export class CardsTotaisComponent implements OnInit {


  Despesas:number = 2134
  Receitas:number = 2678
  Saldo = this.Receitas - this.Despesas
  Orcado = 192

  
  constructor() { }

  ngOnInit(): void {
    this.formatacaoCurrecy()
  }

  formatacaoCurrecy(){
    this.Despesas.toLocaleString('pt-br', {style: 'currency', currency:'BRL'})
  }
}
