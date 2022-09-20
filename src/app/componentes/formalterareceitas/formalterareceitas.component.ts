import { Component, OnInit,EventEmitter, Output,Input } from '@angular/core';
import { Despesas } from 'src/app/service/despesas';
import { KaizenService } from 'src/app/service/kaizen.service';
import { Receitas } from 'src/app/service/receitas';

@Component({
  selector: 'app-formalterareceitas',
  templateUrl: './formalterareceitas.component.html',
  styleUrls: ['./formalterareceitas.component.css']
})
export class FormalterareceitasComponent implements OnInit {

  id_conv:number = 0
  DadosReceitas:Receitas [] = []

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

  AltDadosReceitas:Receitas ={
    Data:'',
    Categoria:'',
    Observacao:'',
    FonteReceita:'',
    SubCategoria:'',
    Valor:0
  }

  //Alteração de Despesa
  @Output() id:EventEmitter<any> = new EventEmitter
  @Output() Data:EventEmitter<any> = new EventEmitter
  @Output() Categoria:EventEmitter<any> = new EventEmitter
  @Output() SubCategoria:EventEmitter<any> = new EventEmitter
  @Output() Valor:EventEmitter<any> = new EventEmitter
  @Output() FonteReceita:EventEmitter<any> = new EventEmitter
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
    this. getReceitas()

  }

  getReceitas(){
    this.kaizenService
    .getReceitas()
    .subscribe(
    (dados)=>{console.log(dados, this.DadosReceitas = dados)})

  }

  getByID(id:number){
    this.kaizenService.getByIdReceita(id).subscribe((data)=>{
      this.AltDadosReceitas = data
    })
    console.log(this.AltDadosReceitas);
    
  }

  update(){
    this.kaizenService.updateReceitas(this.AltDadosReceitas).subscribe((data)=>{console.log(`Atualizado`,this.AltDadosReceitas)})
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
    this.FonteReceita.emit(valor)
    
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
