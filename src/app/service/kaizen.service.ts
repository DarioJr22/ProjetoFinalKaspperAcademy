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

  deleteDespesa(id:number){
    return this.http.delete<Despesas>(`http://localhost:3000/Despesas/${id}`)
  }

  updateDespesas(payload:Despesas){
    return this.http.put(`http://localhost:3000/Despesas/${payload.id}`,payload)
  }

  getByIdDespesa(id:number){
    return this.http.get<Despesas>(`http://localhost:3000/Despesas/${id}`)
  }

  // Métodos Exc Receitas

  getReceitas(){
    return this.http.get<Receitas[]>("http://localhost:3000/Receitas")
  }

  createReceitas(Rece:Receitas){
    return this.http.post<Receitas>("http://localhost:3000/Receitas",Rece)
  }

  deleteReceitas(id:number){
    return this.http.delete<Receitas>(`http://localhost:3000/Receitas/${id}`)
  }

  updateReceitas(payload:Receitas){
    return this.http.put(`http://localhost:3000/Receitas/${payload.id}`,payload)
  }
  getByIdReceita(id:number){
    return this.http.get<Receitas>(`http://localhost:3000/Receitas/${id}`)
  }

}
