import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Despesas } from './despesas';
import { Receitas } from './receitas';

@Injectable({
  providedIn: 'root'
})
export class KaizenService {

  constructor(private http:HttpClient) { }

  getDespesas(){
    return this.http.get<Despesas[]>('http://localhost:3000/Despesas')
  }

  createDespesa(Desp:Despesas){
    return this.http.post<Despesas>("http://localhost:3000/Despesas",Desp)
  }

  // Métodos Exc Receitas

  getReceitas(){
    return this.http.get<Receitas[]>("http://localhost:3000/Receitas")
  }

  createReceitas(Rece:Receitas){
    return this.http.post<Receitas>("http://localhost:3000/Receitas",Rece)
  }
}
