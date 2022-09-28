import { EventEmitter,Output,Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Despesas } from 'src/app/service/despesas';
import { KaizenService } from 'src/app/service/kaizen.service';


import { PageEvent } from '@angular/material/paginator';
import { Receitas } from 'src/app/service/receitas';
import { AlertmodalService } from 'src/app/service/alert/alertmodal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { LanguageApp } from './definicoesdatatables';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
/* import { LanguageSettings } from "./../../../../node_modules/@types/datatables.net/index" */


declare var window:any

@Component({
  selector: 'app-abas-home',
  templateUrl: './abas-home.component.html',
  styleUrls: ['./abas-home.component.css']
})
export class AbasHomeComponent implements OnInit,OnDestroy{
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
  // Lógica de implementação da tabela
  dtOptions:DataTables.Settings = {}
  

  //dados
  dtTrigger:Subject<any> = new Subject<any>()
  /* trocarFields:LanguageSettings */

  //Controle de seleção de abas
  @Input()selecionarAba:string = ''
  @Input()mostrarDuasAbas:boolean = true
  AbaSelecionadaDesp = ''
  AbaSelecionadaReceitas = ''
  faTrash = faTrash


  spanish_datatables = {
    processing: "Procesando...",
    search: "Buscar:",
    lengthMenu: "Mostrar _MENU_ &elementos"
    
  }

  selecaoDeAbaAtiva(selecionarAba:string){
    if(selecionarAba == "Receitas"){
      this.AbaSelecionadaReceitas = "tab-pane fade show active"
      this.AbaSelecionadaDesp = "tab-pane fade"
    }else if (selecionarAba == "Despesas") {
      this.AbaSelecionadaReceitas = "tab-pane fade"
      this.AbaSelecionadaDesp = "tab-pane fade show active "
    }else if (selecionarAba == "AsDuas") {
      this.AbaSelecionadaReceitas = "tab-pane fade show active"
      this.AbaSelecionadaDesp = "tab-pane fade"
    }
  }
  //Validacao
  validacampos:boolean = false

  //Variáveis de seleção de coluna do MatTable
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

  //Variáveis de Iniciaçozação de interface
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
  
  //Modais
  ModalInclusaoDesp:any
  ModalInclusaoRece:any
  ModalDeleteDesp:any
  ModalDeleteRece:any
  ModalAltDesp:any
  ModalAltRece:any


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
              private modalService:AlertmodalService,
              private modalServiceModal:BsModalService,
             

            ) { }

  ngOnInit(): void {
   
    
    this.DadosDespesas =[]
    this.getDespesas()
    this.getReceitas()
    this.carregarForm()
    
    
    console.log(this.dtOptions);
    
    }

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe()
}


/* 
    private showAlert(message:string, type:string){
      const bsModalRef: BsModalRef = this.modalServiceModal.show()
      bsModalRef.content.type = type;
      bsModalRef.content.message = message;
  
    } */

    carregarForm(){
     //Verificar ordem de carregamento dos modais.
     //Ocasiona um erro que faz os modais não fundionarem.
        setTimeout(() => {
          if (this.DadosDespesas.length > 0 &&
              this.DadosReceitas.length > 0) {
                if(this.selecionarAba == 'Despesas'){
                this.ModalInclusaoDesp = new window.bootstrap.Modal(document.getElementById('ModInclusaoDesp'))
                this.ModalAltDesp = new window.bootstrap.Modal(document.getElementById('ModAlteracaoDesp'))
                this.ModalDeleteDesp = new window.bootstrap.Modal(document.getElementById('ModExclusaoDesp'))
                this.carregamento_Abas()
                this.carregamento_Cards()
               }
                else if (this.selecionarAba == 'Receitas'){
                this.ModalInclusaoRece = new window.bootstrap.Modal(document.getElementById('ModInclusaoRece'))
                this.ModalDeleteRece = new window.bootstrap.Modal(document.getElementById('ModExclusãoRece'))
                this.ModalAltRece = new window.bootstrap.Modal(document.getElementById('ModAlteracaoRece'))
                this.carregamento_Abas()
                this.carregamento_Cards()
              }
                else{
                  this.ModalInclusaoDesp = new window.bootstrap.Modal(document.getElementById('ModInclusaoDesp'))
                this.ModalAltDesp = new window.bootstrap.Modal(document.getElementById('ModAlteracaoDesp'))
                this.ModalDeleteDesp = new window.bootstrap.Modal(document.getElementById('ModExclusaoDesp'))
                this.ModalInclusaoRece = new window.bootstrap.Modal(document.getElementById('ModInclusaoRece'))
                this.ModalDeleteRece = new window.bootstrap.Modal(document.getElementById('ModExclusãoRece'))
                this.ModalAltRece = new window.bootstrap.Modal(document.getElementById('ModAlteracaoRece'))
                this.carregamento_Abas()
                this.carregamento_Cards()
               
              }
                
                console.log(this.ModalInclusaoDesp);
                
          }else{this.carregarForm()}
        }, 10000)
        //==
        this.selecaoDeAbaAtiva(this.selecionarAba)
       
        
      
      
    }

   carregarTabelasJquery(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      scrollX: true,
      processing: true,
      deferRender: true,
      destroy:true,
      lengthMenu: [5, 10, 25, 50]
      }
   console.log(this.dtOptions);

   
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
    } else if (this.CreateDadosDespesas.Valor == 0){
      this.modalService.showAlertWarning("Você precisa dizer quanto gastou amigo !")
      this.validacampos = false
    } else if (this.CreateDadosDespesas.Valor < 0){
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
    dados =>{this.DadosDespesas = dados ;
     
      this.dtTrigger.next(this.DadosDespesas);
      this.carregarTabelasJquery() 
    }
)
}

  createDespesas(){
    this.validaCamposDespesas()
    if(this.validacampos == true){
      this.kaizenService
      .createDespesa(this.CreateDadosDespesas)
      .subscribe((data) => console.log(data))
      //Fecha o modal 
      this.ModalInclusaoDesp.hide()
      //Atualiza a tabela
      this.getDespesas()
      //Espera as mudanças e abre o carregando
      setTimeout(() => {this.getDespesas()}, 2000);
      //Carregar tudo
      this.carregamento_Cards();
      this.carregar() 
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
    this.carregamento_Cards();
    this.carregar()
    
  }
  //=============

  ////Form - Alteração

  abriralteracaoDespesa(){
    this.ModalAltDesp.show()
    console.log(this.ModalAltDesp)

  }
  
  updateDespesas(){
    this.kaizenService.updateDespesas(this.CreateDadosDespesas)
        .subscribe((data)=>{ console.log(`${this.CreateDadosDespesas.id} - Alterado`);
        })
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
            //fecha tabela
          this.ModalInclusaoRece.hide()
          }
        ) 
          //atualiza tabela 
          this.getReceitas()
          //espera as mudanças e abre o carregamento
          setTimeout(() => {this.getReceitas()}, 2000)
          //Carregar tudo
          this.carregamento_Cards()
          this.carregar()
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
    //espera as mudanças e abre o carregamento
    this.ModalDeleteRece.hide()
    //Carregar tudo
    this.carregamento_Cards() 
    this.carregar()
  }
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

  abriralteracaoReceitas(){
    this.ModalAltRece.show()

  }


  //_________________________Alterar Despesas


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
    }, 3500);
  }

  carregamento_Cards(){
    setTimeout(() => {
      if (this.DadosDespesas.length > 0 &&
          this.DadosReceitas.length > 0) {
            this.controleDeCarregamento_Abas = false
            this.carregamentoTabelas_Cards.emit(this.controleDeCarregamento_Abas)
            console.log(this.controleDeCarregamento_Abas, 'MASTER');
            
      }else{this.carregamento_Abas()}
    }, 3500);
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
      },3500
    )
  }

  emitirMudanca(event:any){
    this.carregamento_Abas()
  }

  capturarAtualizacao(event:any){
    this.carregar()
    this.getDespesas()
    this.getReceitas()
    console.log(event);
    
  }

  //==================
 
 

 

 

}
