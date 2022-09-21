import { ThisReceiver } from '@angular/compiler';
import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges,Output,EventEmitter } from '@angular/core';
import { data } from 'jquery';
import { Despesas } from 'src/app/service/despesas';
import { KaizenService } from 'src/app/service/kaizen.service';
import { Receitas } from 'src/app/service/receitas';
import { AbasHomeComponent } from '../abas-home/abas-home.component';

@Component({
  selector: 'app-cards-totais',
  templateUrl: './cards-totais.component.html',
  styleUrls: ['./cards-totais.component.css']
})
export class CardsTotaisComponent implements OnInit, OnChanges {


  @Output()cardsCarregados:EventEmitter<any> = new EventEmitter
  controleDeCarregamento_Cards:boolean = true 

  @Input() DadosDespesas:Despesas [] = []
  DadosReceitas:Receitas[] = []
  width:any

  ValorTotalDespesas:number = 0
  ValorTotalReceitas:number = 0




  Despesas:number = 2134
  Receitas:number = 2678



  Saldo = this.Receitas - this.Despesas
  Orcado = 192
  PercentualGast= this.Receitas/this.Despesas*100

  constructor(private kaizenService:KaizenService,
  ) { }

  ngOnInit(): void {
    this.formatacaoCurrecy()
    this.carregarform()

  }

  carregarform(){
    this.carregou_Abas(this.controleDeCarregamento_Cards)
    this.getDespesas()
    this.getReceitas()
    this.esperarDespesas()
    this.esperarReceitas()
    this.calcularSaldo()
  }

  ngOnChanges(changes: SimpleChanges) {
   console.log(changes);
   this.ValorTotalDespesas 
   
  }
  
  carregouAgoraMeAjuda(event:any){
    
    this.carregarform()
    this.cardsCarregados.emit(true)
    

  }


  formatacaoCurrecy(){
    this.Despesas.toLocaleString('pt-br', {style: 'currency', currency:'BRL'})
  }
  //Dados

  getDespesas(){
    this.kaizenService
    .getDespesas()
    .subscribe((dados)=>{console.log(dados, this.DadosDespesas = dados,)})
  }

  getReceitas(){
    this.kaizenService
    .getReceitas()
    .subscribe((data) => console.log(this.DadosReceitas = data))
  }

  //Calculo
  calcularTotalDespesas(){
    this.ValorTotalDespesas = 0
    this.DadosDespesas.forEach((dados) =>{
      return this.ValorTotalDespesas += dados.Valor})
    console.log(this.ValorTotalDespesas);
  }

  calcularTotalReceitas(){
    this.ValorTotalReceitas = 0
    this.DadosReceitas.forEach((dados) =>{
      return this.ValorTotalReceitas += dados.Valor})
    console.log(this.ValorTotalReceitas);
  }

  //Funcionalidades

  /* Espera retornar uma lista para executar uma função  */

  esperarReceitas(){
    setTimeout(()=>{
      if (this.DadosReceitas.length > 0){this.calcularTotalReceitas()}
      else{this.esperarReceitas()}
      },5000
    )
  }

  calcularSaldo(){
    setTimeout(() => {
      if(this.DadosDespesas.length > 0 &&
         this.DadosReceitas.length > 0){
          this.Saldo = this.ValorTotalReceitas - this.ValorTotalDespesas
          this.PercentualGast = this.ValorTotalDespesas/this.ValorTotalReceitas*100
          this.width = `width:${this.PercentualGast.toFixed(0)}%`
          console.log(this.width);
          
          }else{this.calcularSaldo()}}, 5000);
  }


  esperarDespesas(){
    setTimeout(()=>{
      if (this.DadosDespesas.length > 0){
        this.calcularTotalDespesas()
        }
      else{this.esperarDespesas()}
      },5000
    )
  }

  carregou_Abas(event:any){
    setTimeout(() => {
      if (this.DadosDespesas.length > 0 &&
          this.DadosReceitas.length > 0 &&
          this.Saldo != 0 &&
          this.width != 0 ) {
            this.controleDeCarregamento_Cards = event
            this.cardsCarregados.emit(this.controleDeCarregamento_Cards)
            console.log(event, 'carregou os cards');
            
      }else{this.carregou_Abas(event)}
    }, 5000);
  }
  
}
