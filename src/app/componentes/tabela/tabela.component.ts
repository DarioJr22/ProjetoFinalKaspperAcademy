import { Component, OnInit } from '@angular/core';
import { Despesas } from 'src/app/service/despesas';
import { KaizenService } from 'src/app/service/kaizen.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {
  
  DadosDespesas:Despesas [] = []

  
  constructor(private kaizenService:KaizenService) { }

  ngOnInit(): void {
    this.getDespesas()
  }

  getDespesas(){
    this.kaizenService
    .getDespesas()
    .subscribe((dados)=>{console.log(dados, this.DadosDespesas = dados);
    })
  }
}
