import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnChanges {
  carregado_cards= false 
  carregando_cards:Boolean = false
  carregando = true 

  constructor() { }

  ngOnInit(): void {
    this.esperarCarregando()

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    /* this.carregouCards(this.carregando) */
     
  }
  
  esperarCarregando(){
    setTimeout(() => {
      this.carregando = false 
    }, 10000);
  }
  carregouCards(){
    this.carregando
  }


  carregamentoHome(){
    if(this.carregado_cards == true){
        this.carregando == true
      }else{ this.carregando == false}
    }
}
