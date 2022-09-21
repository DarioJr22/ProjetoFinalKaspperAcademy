import { EventEmitter,Output,AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild,Input, SimpleChange } from '@angular/core';
import { Despesas } from 'src/app/service/despesas';
import { KaizenService } from 'src/app/service/kaizen.service';


import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { data } from 'jquery';
import { Receitas } from 'src/app/service/receitas';
import { CardsTotaisComponent } from '../cards-totais/cards-totais.component';
import { CustomMatPaginatorIntl } from 'src/app/service/custominitl';
import { AlertmodalService } from 'src/app/service/alert/alertmodal.service';


declare var window:any

@Component({
  selector: 'app-abas-home',
  templateUrl: './abas-home.component.html',
  styleUrls: ['./abas-home.component.css']
})
export class AbasHomeComponent implements OnInit{
  //Carregamento
  //Evento de saída para componente de cards
  @Output()carregamentoTabelas_Abas:EventEmitter<any> = new EventEmitter
  @Output()carregamentoTabelas_Cards:EventEmitter<any> = new EventEmitter
  controleDeCarregamento_Abas = true

  //Variáveis
  idDelete:number = 0
  idEdit:number = 0
  DadosDespesas:Despesas [] = []
  DadosReceitas:Receitas [] = []
  ValorTotalDespesas:number = 0 
  
  //Validacao
  validacampos:boolean = false

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
  ModalAltDesp:any
  ModalAltRece:any
  //_______Paginator_________

  length =5 
  pageSize = 10
  pageSizOptions:number [] = [5,10,25,100]
  
  
  //_______________
  pageEvent:PageEvent = {
    length : 5,
    pageIndex: 0,
    pageSize: 10,
   
    
  }
/*
 @ViewChild(MatPaginator) 
 paginator:MatPaginator
 
  ngAfterViewInit(): void {
     this.DadosDespesas.paginator.page.subscribe() = this.paginator
  }


  setPageOptions(setPageSizeInput:string){
    if(setPageSizeInput){
      this.pageSizOptions = setPageSizeInput.split( ',' ).map( str => +str);
    }
  } */
  //_______________

  constructor(private kaizenService:KaizenService,
              private modalService:AlertmodalService   
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
      this.ModalAltDesp = new window.bootstrap.Modal(document.getElementById('ModAlteracaoDesp'))
      this.ModalAltRece = new window.bootstrap.Modal(document.getElementById('ModAlteracaoRece'))
      this.carregamento_Abas()
    }

   
  //------------------------------------ DESPESAS ------------------------------------

  validaCamposDespesas(){
    if(this.CreateDadosDespesas.Data == ''){
        this.modalService.showAlertWarning("Selecione uma data.")
        this.validacampos = false
    } else if (this.CreateDadosDespesas.Categoria == ''){
        this.modalService.showAlertWarning("Selecione uma categoria de Despesa.")
        this.validacampos = false
    } else if (this.CreateDadosDespesas.FonteDespesa == ''){
      this.modalService.showAlertWarning("Selecione uma Fonte de Renda.")
      this.validacampos = false
    }else if (this.CreateDadosDespesas.Valor == 0){
      this.modalService.showAlertWarning("Você precisa dizer quanto gastou amigo !")
      this.validacampos = false
    }else if (this.CreateDadosDespesas.Valor < 0){
      this.modalService.showAlertWarning("Apenas números Positivos !")
      this.validacampos = false
    } else{
      this.modalService.showAlertSuccess("Despesa Registrada !")
      this.validacampos = true}
  }

  getDespesas(){
    this.kaizenService
    .getDespesas()
    .subscribe(
    (dados)=>{console.log(dados, this.DadosDespesas = dados)})
  }

  createDespesas(){
    this.validaCamposDespesas()
    if(this.validacampos == true){
      this.kaizenService
      .createDespesa(this.CreateDadosDespesas)
      .subscribe((data) => console.log(data))
      this.ModalInclusaoDesp.hide()
      setTimeout(() => {this.getDespesas(),this.calcularTotalDespesas()}, 2000);
      return true
    } else {
      return false
    }
    
    
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

  abriralteracaoDespesa(){
    this.ModalAltDesp.show()

  }

  abriralteracaoReceitas(){
    this.ModalAltRece.show()

  }


  //Form - Inclusão 
  CapturaIdDesp(event:any){
    this.CreateDadosDespesas.id = event
   
  }

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
    console.log(this.CreateDadosDespesas);
    
  }

 //Calculo

 calcularTotalDespesas(){
  this.ValorTotalDespesas = 0
  this.DadosDespesas.forEach((dados) =>{
    return this.ValorTotalDespesas += dados.Valor})
  console.log(this.ValorTotalDespesas);
  
}



//------------------------------------ RECEITAS ------------------------------------
validaCamposReceitas(){
  if(this.CreateDadosReceitas.Data == ''){
      this.modalService.showAlertWarning("Selecione uma data.")
      this.validacampos = false
  } else if (this.CreateDadosReceitas.Categoria == ''){
      this.modalService.showAlertWarning("Selecione uma categoria de Receita.")
      this.validacampos = false
  } else if (this.CreateDadosReceitas.FonteReceita == ''){
    this.modalService.showAlertWarning("Para qual fonte será direcionada a Receita.")
    this.validacampos = false
  }else if (this.CreateDadosReceitas.Valor == 0){
    this.modalService.showAlertWarning("Você precisa dizer quanto gastou amigo !")
    this.validacampos = false
  }else if (this.CreateDadosReceitas.Valor < 0){
    this.modalService.showAlertWarning("Apenas números Positivos !")
    this.validacampos = false
  } else{
    this.modalService.showAlertSuccess("Receita Registrada !")
    this.validacampos = true}
}

  getReceitas(){
    this.kaizenService
    .getReceitas()
    .subscribe((data) => console.log(this.DadosReceitas = data))
  }

 
    

  createReceitas(){
    this.validaCamposReceitas()
      if(this.validacampos == true){
        this.kaizenService.createReceitas(this.CreateDadosReceitas)
          .subscribe((data) => {console.log(data)
          this.ModalInclusaoRece.hide()})
          setTimeout(() => {this.getReceitas()}, 2000)
        return true
  } else {
    return false
  }
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


  //_________________________Alterar Despesas

  updateDespesas(){
    this.kaizenService.updateDespesas(this.CreateDadosDespesas)
        .subscribe((data)=>{ console.log(`${this.CreateDadosDespesas.id} - Alterado`);
        })
  }


  teste(){

    console.log(this.CreateDadosDespesas);
    
  }
  //Lógica de carregamento  
  carregamento_Abas(){
    setTimeout(() => {
      if (this.DadosDespesas.length > 0 &&
          this.DadosReceitas.length > 0) {
            this.controleDeCarregamento_Abas = false
            this.carregamentoTabelas_Abas.emit(this.controleDeCarregamento_Abas)
            console.log(this.controleDeCarregamento_Abas,'carregou tabelas');
            
      }else{this.carregamento_Abas()}
    }, 5000);
  }

  carregamento_Cards(){
    setTimeout(() => {
      if (this.DadosDespesas.length > 0 &&
          this.DadosReceitas.length > 0) {
            this.controleDeCarregamento_Abas = false
            this.carregamentoTabelas_Cards.emit(this.controleDeCarregamento_Abas)
            console.log(this.controleDeCarregamento_Abas, 'MASTER');
            
      }else{this.carregamento_Abas()}
    }, 5000);
  }


  carregar(){
    setTimeout(() => {
            this.carregamentoTabelas_Cards.emit(true)
    }, 1000);
  }

esperarDespesas(){
    setTimeout(()=>{
      if (this.DadosDespesas.length > 0 &&
        this.DadosReceitas.length > 0){
        this.calcularTotalDespesas()}
      else{this.esperarDespesas()}
      },7000
    )
  }

  emitirMudanca(event:any){
    this.carregamento_Abas()
    
  }
}
