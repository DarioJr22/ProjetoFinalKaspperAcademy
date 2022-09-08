import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Despesas } from 'src/app/service/despesas';
import { KaizenService } from 'src/app/service/kaizen.service';

import { MatPaginator } from '@angular/material/paginator';
import { data } from 'jquery';
import { Receitas } from 'src/app/service/receitas';
import { CardsTotaisComponent } from '../cards-totais/cards-totais.component';


declare var window:any

@Component({
  selector: 'app-abas-home',
  templateUrl: './abas-home.component.html',
  styleUrls: ['./abas-home.component.css']
})
export class AbasHomeComponent implements OnInit {
  
  //Variáveis
  idDelete:number = 0
  DadosDespesas:Despesas [] = []
  DadosReceitas:Receitas [] = []
  ValorTotalDespesas:number = 0 

  displayedColumnsDespesas:String[] = 
  ['id',
  'Data',
  'Categoria',
  'SubCategoria',
  'Valor',
  'FonteDespesas',
  'Observacao',
  'Delete/Edit']

  displayedColumnsReceitas:String[] = 
  ['id_R',
  'Data_R',
  'Categoria_R',
  'SubCategoria_R',
  'Valor_R',
  'FonteReceitas_R',
  'Observacao_R',
  'Deletar/Alterar_R']

  CreateDadosDespesas:Despesas ={
    Data:'',
    Categoria:'',
    Observacao:'',
    FonteDespesa:'',
    SubCategoria:'',
    Valor:0
  }

  CreateDadosReceitas:Receitas ={
    Data:'',
    Categoria:'',
    Observacao:'',
    FonteReceita:'',
    SubCategoria:'',
    Valor:0
  }
  
  ModalInclusaoDesp:any
  ModalInclusaoRece:any
  ModalDeleteDesp:any
  ModalDeleteRece:any

  constructor(private kaizenService:KaizenService,
            ) { }

  ngOnInit(): void {
    this.DadosDespesas =[]
    this.getDespesas()
    this.getReceitas()
    this.carregarForm()
   
    }

    carregarForm(){
      this.ModalInclusaoDesp = new window.bootstrap.Modal(document.getElementById('ModInclusaoDesp'))
      this.ModalInclusaoRece = new window.bootstrap.Modal(document.getElementById('ModInclusaoRece'))
      this.ModalDeleteDesp = new window.bootstrap.Modal(document.getElementById('ModExclusãoDesp'))
      this.ModalDeleteRece = new window.bootstrap.Modal(document.getElementById('ModExclusãoRece'))
  }

   
  //------------------------------------ DESPESAS ------------------------------------

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
    this.ModalInclusaoDesp.hide()
    setTimeout(() => {this.getDespesas(),this.calcularTotalDespesas()}, 2000);
  }

  //Form - Deleção

  abrirDeleteModalDespesas(id:any){
    this.idDelete =id
    this.ModalDeleteDesp.show()
    console.log(this.idDelete)
  }

  deleteDespesa(){
    this.kaizenService
    .deleteDespesa(this.idDelete)
    .subscribe((data) => {this.DadosDespesas = this.DadosDespesas.filter(ID => ID.id !== this.idDelete)
                          this.ModalDeleteDesp.hide()})
    
  }


  //Form - Inclusão 

  CapturaDataDesp(event:any){
    this.CreateDadosDespesas.Data = event
    console.log(this.CreateDadosDespesas.Data);
  }

  CapturaCategoriaDesp(event:any){
    this.CreateDadosDespesas.Categoria = event
    console.log(this.CreateDadosDespesas.Categoria);
  }

  CapturaSubCategoriaDesp(event:any){
    this.CreateDadosDespesas.SubCategoria = event
    console.log(this.CreateDadosDespesas.SubCategoria);
  }

  CapturaFonteDespesa(event:any){
    this.CreateDadosDespesas.FonteDespesa = event
    console.log(this.CreateDadosDespesas.FonteDespesa);
  }

  CapturaValorDesp(event:any){
    let convers = parseFloat(event)
    this.CreateDadosDespesas.Valor = convers
    console.log(this.CreateDadosDespesas.Valor);
  }

  CapturaObservacaoDesp(event:any){
    this.CreateDadosDespesas.Observacao = event
    console.log(this.CreateDadosDespesas.Observacao);
  }

  abrirCreateModalDespesas(){
    this.ModalInclusaoDesp.show()
  }

 //Calculo

 calcularTotalDespesas(){
  this.ValorTotalDespesas = 0
  this.DadosDespesas.forEach((dados) =>{
    return this.ValorTotalDespesas += dados.Valor})
  console.log(this.ValorTotalDespesas);
  
}



//------------------------------------ RECEITAS ------------------------------------


  getReceitas(){
    this.kaizenService
    .getReceitas()
    .subscribe((data) => console.log(this.DadosReceitas = data))
  }

  createReceitas(){
    this.kaizenService.createReceitas(this.CreateDadosReceitas)
    .subscribe((data) => {console.log(data)
    this.ModalInclusaoRece.hide()})
    setTimeout(() => {this.getReceitas()}, 2000)
  }

  //Form - Deleção

  abrirDeleteModalReceitas(id:any){
    this.idDelete = id
    this.ModalDeleteRece.show()
    console.log(this.idDelete);
  }

  deleteReceita(){

    this.kaizenService
    .deleteReceitas(this.idDelete)
    .subscribe((data)=>{this.DadosReceitas = this.DadosReceitas.filter(ID => ID.id !== this.idDelete)
    this.ModalDeleteRece.hide()}
  )
}

  //Form - Inclusão



  
  CapturaDataRece(event:any){
    this.CreateDadosReceitas.Data = event
    console.log(this.CreateDadosReceitas.Data);
  }

  CapturaCategoriaRece(event:any){
    this.CreateDadosReceitas.Categoria = event
    console.log(this.CreateDadosReceitas.Categoria);
  }

  CapturaSubCategoriaRece(event:any){
    this.CreateDadosReceitas.SubCategoria = event
    console.log(this.CreateDadosReceitas.SubCategoria);
  }

  CapturaFonteReceitas(event:any){
    this.CreateDadosReceitas.FonteReceita = event
    console.log(this.CreateDadosReceitas.FonteReceita);
  }

  CapturaValorRece(event:any){
    this.CreateDadosReceitas.Valor = event
    console.log(this.CreateDadosReceitas.Valor);
  }

  CapturaObservacaoRece(event:any){
    this.CreateDadosReceitas.Observacao = event
    console.log(this.CreateDadosReceitas.Observacao);
  }

  abrirCreateModalReceitas(){
    this.ModalInclusaoRece.show()
  }


  teste(){

    console.log(this.CreateDadosDespesas);
    
  }
  

}
