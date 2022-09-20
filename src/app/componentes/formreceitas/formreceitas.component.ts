import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { data } from 'jquery';

@Component({
  selector: 'app-formreceitas',
  templateUrl: './formreceitas.component.html',
  styleUrls: ['./formreceitas.component.css']
})
export class FormreceitasComponent implements OnInit {

  CategoriaList:string[] = 
  [ '',
    'Salário',
    'Investimentos',
    'Empreendimentos',
    'Freelas',
    'Outros'
  ]

  Fonte:string[] =
  [ '',
    'ITAU',
    'PICPAY',
    'NUBANK',
    'SANTANDER',
    'CartãoCrédito1',
    'CartãoCrédito2'
  ]

  //Cadastro de Despesa
  @Output() Data:EventEmitter<any> = new EventEmitter
  @Output() Categoria:EventEmitter<any> = new EventEmitter
  @Output() SubCategoria:EventEmitter<any> = new EventEmitter
  @Output() Valor:EventEmitter<any> = new EventEmitter
  @Output() FonteReceita:EventEmitter<any> = new EventEmitter
  @Output() Observacao:EventEmitter<any> = new EventEmitter


  constructor() { }

  ngOnInit(): void {
  }

  CapturaData(valor:any){
    /* let data_americana = valor
    let data_brasileira = data_americana.split('-').reverse().join('/')
     */
    
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

  CapturaFonteReceitas(valor:any){
    this.FonteReceita.emit(valor)
    
  }

  CapturaValor(valor:any){
    let conv = parseFloat(valor)
    this.Valor.emit(conv)
    
  }

  CapturaObservacao(valor:any){
    this.Observacao.emit(valor)
    
  }
 

}
