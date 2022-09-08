import { Component, OnInit, Output } from '@angular/core';
import { Despesas } from 'src/app/service/despesas';
import { KaizenService } from 'src/app/service/kaizen.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-formdespesasdelete',
  templateUrl: './formdespesasdelete.component.html',
  styleUrls: ['./formdespesasdelete.component.css']
})
export class FormdespesasdeleteComponent implements OnInit {
 
 
  DadosDespesas:Despesas [] = []

  @Output() id:EventEmitter<any> = new EventEmitter
  @Output() Observacao:EventEmitter<any> = new EventEmitter

  constructor(private kaizenService:KaizenService) { }

  ngOnInit(): void {

  }

  getDespesas(){
    this.kaizenService
    .getDespesas()
    .subscribe(
    (dados)=>{console.log(dados, this.DadosDespesas = dados)})
  }

  CapturaId(valor:any){
    this.id.emit(valor)
    
  }

  CapturaObservacao(valor:any){
    this.Observacao.emit(valor)
    
  }

}
