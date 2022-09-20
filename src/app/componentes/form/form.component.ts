import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-formdespesas',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  SubCategoriasList:string[] = 
  [ '',
    'Alimentação',
    'Lazer',
    'Esportes',
    'Cursos',
    'Faculdade',
    'Bolsa de Valores'
  ]

  CategoriaList:string[] = 
  [ '',
    'Casa-moradia',
    'Cuidado Pessoal',
    'Investimento',
    'Educação'
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
  @Output() FonteDespesa:EventEmitter<any> = new EventEmitter
  @Output() Observacao:EventEmitter<any> = new EventEmitter


  constructor() { }

  ngOnInit(): void {
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
 

}
