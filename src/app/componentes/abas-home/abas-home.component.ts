import { Component, OnInit } from '@angular/core';
import { Despesas } from 'src/app/service/despesas';
import { KaizenService } from 'src/app/service/kaizen.service';

import { MatPaginator } from '@angular/material/paginator';


declare var window:any

@Component({
  selector: 'app-abas-home',
  templateUrl: './abas-home.component.html',
  styleUrls: ['./abas-home.component.css']
})
export class AbasHomeComponent implements OnInit {
  
  //Variáveis

  DadosDespesas:Despesas [] = []

  displayedColumns:String[] = 
  ['Id',
  'Data',
  'Categoria',
  'SubCategoria',
  'Valor',
  'FonteDespesa',
  'Observacao']

  CreateDadosDespesas:Despesas ={
    Data:'10/05/2022',
    Categoria:'Casa-Modaria',
    Observacao:'Feira do Mês Maio',
    FonteDespesa:'Vale Refeição',
    SubCategoria:'Alimentação',
    Valor:459.98
  }
  
  ModalInclusao:any


  constructor(private kaizenService:KaizenService) { }

  ngOnInit(): void {
    this.DadosDespesas =[]
    this.getDespesas()
    this.carregarForm()
   
    }

  getDespesas(){
    this.kaizenService
    .getDespesas()
    .subscribe((dados)=>{console.log(dados, this.DadosDespesas = dados);
    })
  }

  abrirCreateModal(){
    this.ModalInclusao.show()
  }

  carregarForm(){
      this.ModalInclusao = new window.bootstrap.Modal(document.getElementById('ModInclusaoDesp'))
  }
  

}
