import { Component, OnInit,EventEmitter, Output,Input } from '@angular/core';
import { Despesas } from 'src/app/service/despesas';
import { KaizenService } from 'src/app/service/kaizen.service';

@Component({
  selector: 'app-formalteradespesas',
  templateUrl: './formalteradespesas.component.html',
  styleUrls: ['./formalteradespesas.component.css']
})
export class FormalteradespesasComponent implements OnInit {
  
  id_conv:number = 0
  DadosDespesas:Despesas [] = []

  SubCategoriasList:string[] = 
  [
    'Alimentação',
    'Lazer',
    'Esportes',
    'Cursos',
    'Faculdade',
    'Bolsa de Valores'
  ]

  CategoriaList:string[] = 
  [
    'Casa-moradia',
    'Cuidado Pessoal',
    'Investimento',
    'Educação'
  ]

  Fonte:string[] =
  [
    'ITAU',
    'PICPAY',
    'NUBANK',
    'SANTANDER',
    'CartãoCrédito1',
    'CartãoCrédito2'
  ]

  AltDadosDespesas:Despesas ={
    Data:'',
    Categoria:'',
    Observacao:'',
    FonteDespesa:'',
    SubCategoria:'',
    Valor:0
  }

  //Alteração de Despesa
  @Output() id:EventEmitter<any> = new EventEmitter
  @Output() Data:EventEmitter<any> = new EventEmitter
  @Output() Categoria:EventEmitter<any> = new EventEmitter
  @Output() SubCategoria:EventEmitter<any> = new EventEmitter
  @Output() Valor:EventEmitter<any> = new EventEmitter
  @Output() FonteDespesa:EventEmitter<any> = new EventEmitter
  @Output() Observacao:EventEmitter<any> = new EventEmitter

  //Alteração de Despesa
  /* @Input('id') id_alt:number = 0; */
  @Input('Data') Data_alt:string = '';
  @Input('Categoria') Categoria_alt:string = '';
  @Input('SubCategoria') SubCategoria_alt:string = '';
  @Input('Valor') Valor_alt:number = 0;
  @Input('FonteDespesa') FonteDespesa_alt:string = '';
  @Input('Observacao') Observacao_alt:string = '';


  constructor(private kaizenService:KaizenService) { }

  ngOnInit(): void {
    this. getDespesas()

  }

  getDespesas(){
    this.kaizenService
    .getDespesas()
    .subscribe(
    (dados)=>{console.log(dados, this.DadosDespesas = dados)})

  }

  getByID(id:number){
    this.kaizenService.getByIdDespesa(id).subscribe((data)=>{
      this.AltDadosDespesas = data
    })
    console.log(this.AltDadosDespesas);
    
  }

  update(){
    this.kaizenService.updateDespesas(this.AltDadosDespesas).subscribe((data)=>{console.log(`Atualizado`,this.AltDadosDespesas)})
  }

  CapturaData(valor:any){
    let data_americana = valor
    let data_brasileira = data_americana.split('-').reverse().join('/')

    
    this.Data.emit(data_brasileira)
    
  }

  CapturaCategoria(valor:any){
    this.Categoria.emit(valor)
    
  }
  CapturaSubCategoria(valor:any){
    this.SubCategoria.emit(valor)
    
  }

  CapturaFonteDespesa(valor:any){
    this.FonteDespesa.emit(valor)
    
  }

  CapturaValor(valor:any){
    this.Valor.emit(valor)
    
  }

  CapturaObservacao(valor:any){
    this.Observacao.emit(valor)
    
  }

  CapturaId(valor:any){
   this.id_conv = valor
    this.id.emit(valor)
    console.log(valor);
    var id = this.id_conv
    this.getByID(id)
    
  }
}
