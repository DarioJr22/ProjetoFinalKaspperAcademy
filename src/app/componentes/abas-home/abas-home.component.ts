import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Despesas } from 'src/app/service/despesas';
import { KaizenService } from 'src/app/service/kaizen.service';

import { MatPaginator } from '@angular/material/paginator';
import { data } from 'jquery';
import { Receitas } from 'src/app/service/receitas';


declare var window:any

@Component({
  selector: 'app-abas-home',
  templateUrl: './abas-home.component.html',
  styleUrls: ['./abas-home.component.css']
})
export class AbasHomeComponent implements OnInit {
  
  //Variáveis
  
  DadosDespesas:Despesas [] = []

  DadosReceitas:Receitas [] = []

  displayedColumnsDespesas:String[] = 
  ['id',
  'Data',
  'Categoria',
  'SubCategoria',
  'Valor',
  'FonteDespesas',
  'Observacao']

  displayedColumnsReceitas:String[] = 
  ['id_R',
  'Data_R',
  'Categoria_R',
  'SubCategoria_R',
  'Valor_R',
  'FonteReceitas_R',
  'Observacao_R']

  CreateDadosDespesas:Despesas ={
    Data:'10/05/2022',
    Categoria:'Casa-Modaria',
    Observacao:'Feira do Mês Maio',
    FonteDespesa:'Vale Refeição',
    SubCategoria:'Alimentação',
    Valor:459.98
  }

  CreateDadosReceitas:Receitas ={
    Data:'10/05/2022',
    Categoria:'Casa-Modaria',
    Observacao:'Feira do Mês Maio',
    FonteReceita:'Vale Refeição',
    SubCategoria:'Alimentação',
    Valor:459.98
  }
  
  ModalInclusaoDesp:any
  ModalInclusaoRece:any


  constructor(private kaizenService:KaizenService) { }

  ngOnInit(): void {
    this.DadosDespesas =[]
    this.getDespesas()
    this.getReceitas()
    this.carregarForm()
   
    }

   
//Serviço

  getDespesas(){
    this.kaizenService
    .getDespesas()
    .subscribe(
    (dados)=>{console.log(dados, this.DadosDespesas = dados)})
  }

  createDespesas(){
    this.kaizenService
    .createDespesa(this.CreateDadosDespesas)
    .subscribe((data) => console.log(data))
    
  }

  getReceitas(){
    this.kaizenService
    .getReceitas()
    .subscribe((data) => console.log(this.DadosReceitas = data))
  }

  createReceitas(){
    this.kaizenService.createReceitas(this.CreateDadosReceitas)
    .subscribe((data) => console.log(data))
  }

  abrirCreateModalDespesas(){
    this.ModalInclusaoDesp.show()
  }

  abrirCreateModalReceitas(){
    this.ModalInclusaoRece.show()
  }

  carregarForm(){
      this.ModalInclusaoDesp = new window.bootstrap.Modal(document.getElementById('ModInclusaoDesp'))
      this.ModalInclusaoRece = new window.bootstrap.Modal(document.getElementById('ModInclusaoRece'))
  }

  //Métodos de Captura de eventos

  teste(){

    console.log(this.CreateDadosDespesas);
    
  }

  CapturaData(event:any){
    this.CreateDadosDespesas.Data = event
    console.log(this.CreateDadosDespesas.Data);
  }

  CapturaCategoria(event:any){
    this.CreateDadosDespesas.Categoria = event
    console.log(this.CreateDadosDespesas.Categoria);
  }

  CapturaSubCategoria(event:any){
    this.CreateDadosDespesas.SubCategoria = event
    console.log(this.CreateDadosDespesas.SubCategoria);
  }

  CapturaFonteDespesa(event:any){
    this.CreateDadosDespesas.FonteDespesa = event
    console.log(this.CreateDadosDespesas.FonteDespesa);
  }

  CapturaValor(event:any){
    this.CreateDadosDespesas.Valor = event
    console.log(this.CreateDadosDespesas.Valor);
  }

  CapturaObservacao(event:any){
    this.CreateDadosDespesas.Observacao = event
    console.log(this.CreateDadosDespesas.Observacao);
  }

  //Paginação da tabela

  

}
