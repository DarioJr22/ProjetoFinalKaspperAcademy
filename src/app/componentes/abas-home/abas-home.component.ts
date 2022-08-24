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

  //Métodos de Captura de eventos

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






  /* 
  (Data)=""
                (Categoria)="CapturaCategotia($event)"
                (SubCategoria)=""
                (Observacao)=""
                (FonteDespesa)=""
                (Valor)=""
  CapturaNome(event){
  
    this.AlunoFiltro.Nome = event
    console.log(this.AlunoFiltro.Nome);
    
    
  }
  CapturaTelefone(event){
    this.AlunoFiltro.Telefone = event
    console.log(this.AlunoFiltro.Telefone);
    
  }
  CapturaCondPag(event){
    this.AlunoFiltro.CondPag = event
    console.log(this.AlunoFiltro.CondPag);
  }
  
  CapturaEndereco(event){
    this.AlunoFiltro.Endereco  =event
    console.log(this.AlunoFiltro.Endereco);
  }
  
  CapturaCurso(event){
    this.AlunoFiltro.Cursos  =event
    console.log(this.AlunoFiltro.Cursos);
    
  } */
  

}
