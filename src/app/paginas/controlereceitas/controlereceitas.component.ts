import { Component, OnInit } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { Color } from 'd3';
import { KaizenService } from 'src/app/service/kaizen.service';
import { Receitas } from 'src/app/service/receitas';

@Component({
  selector: 'app-controlereceitas',
  templateUrl: './controlereceitas.component.html',
  styleUrls: ['./controlereceitas.component.css']
})
export class ControlereceitasComponent implements OnInit {


    //Dados de Despesas
    DadosReceitas:Receitas[] = []
    //Categorias -- Despesas // Gráfico de pizza 
    Cat1:number = 0
    Lista1:any[] = []
  
    Cat2:number = 0
    Lista2:any[] = []
  
    Cat3:number = 0
    Lista3:any[] = []
  
    Cat4:number = 0
    Lista4:any[] = []

    Cat5:number = 0
    Lista5:any[] = []
    
     //Atributos para o gráfico de despesas -- Despesas // Gráfico de pizza 
    view: [number,number] = [700,400];
    ListaCategorica:any [] = []
    gradient: boolean = false;
    showLegend: boolean = false;
    showLabels: boolean = false;
    isDoughnut: boolean = false;
   /*  colorScheme:Color = {name:'MyScheme',
      selectable:true,
      group:ScaleType.Quantile,
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    } */;
    CategoriaList:string[] = 
    [
      'Salário',
      'Investimentos',
      'Empreendimentos',
      'Freelas',
      'Outros'
    ]
  
    //=======================================================================
    //Atributos para o gráfico de despesas -- Despesas // Gráfico de Barras empilhadas
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradientEmp: boolean = false;
    showLegendEmp: boolean = true;
    showXAxisLabel: boolean = false;
    xAxisLabel: string = 'Country';
    showYAxisLabel: boolean = false;
    yAxisLabel: string = 'Population';
    animations: boolean = true;
    showDataLabel:boolean = true
  
    
    
    
  
  
    constructor(private kaizenService:KaizenService) { }
  
    ngOnInit(): void {
      this.getReceitas()
      //Carregamento Gráfico de pizza.
      this.esperarReceitas("Salário") 
      this.esperarReceitas("Cuidado Pessoal")
      this.esperarReceitas("Educação")
      this.esperarReceitas("Investimento")
      this.esperarReceitas("Outros")
      this.setarInformacoes()
      this.transformacaoHistDiario()
      this.atualizarInformacoes()
      
    }
  
    getReceitas(){
      this.kaizenService.getReceitas().subscribe((data)=>{console.log(this.DadosReceitas = data)})
    }
  
  
    //Gráfico de Pizza
    //Calculo
    somatorioCategoricoDesp(nomeCategoria:string){
      let Valor = 0
      let Lista:any = []
      this.DadosReceitas.forEach((dados)=>{
            if(nomeCategoria == dados.Categoria){
              if( nomeCategoria == "Salário" ){
                Valor +=dados.Valor
                Lista.push(`${dados.id} - ${dados.Data} - ${dados.Categoria} - ${dados.Valor}`)
                this.Cat1 = Valor
                this.Lista1 = Lista
              }
              if( nomeCategoria == "Investimentos" ){
                Valor +=dados.Valor
                Lista.push(`${dados.id} - ${dados.Data} - ${dados.Categoria} - ${dados.Valor}`)
                this.Cat2 = Valor
                this.Lista2 = Lista
              }
              if( nomeCategoria == "Empreendimentos" ){
                Valor +=dados.Valor
                Lista.push(`${dados.id} - ${dados.Data} - ${dados.Categoria} - ${dados.Valor}`)
                this.Cat3 = Valor
                this.Lista3 = Lista
              }
              if( nomeCategoria == "Freelas" ){
                Valor +=dados.Valor
                Lista.push(`${dados.id} - ${dados.Data} - ${dados.Categoria} - ${dados.Valor}`)
                this.Cat4 = Valor
                this.Lista4 = Lista
              }
              if( nomeCategoria == "Outros" ){
                Valor +=dados.Valor
                Lista.push(`${dados.id} - ${dados.Data} - ${dados.Categoria} - ${dados.Valor}`)
                this.Cat5 = Valor
                this.Lista5 = Lista
              }
          }
        }
      )
      
      return Valor
      
    }
      
    esperarReceitas(nomeCategoria:string){
      setTimeout(()=>{
        if (this.DadosReceitas.length > 0){this.somatorioCategoricoDesp(nomeCategoria)}
        else{this.esperarReceitas(nomeCategoria)}
        },2000
      )
    }
    setarInformacoes(){
      setTimeout(()=>{
        if (this.DadosReceitas.length > 0){}
        this.atualizarInformacoes()
      },3000
    )
  }
  
    atualizarInformacoes(){
      this.DivisaoCategoricaReceitas = [
        {
          "name": "Casa-Salário",
          "value": this.Cat1
        },
        {
          "name": "Cuidado Pessoal",
          "value": this.Cat2
        },
        {
          "name": "Investimento",
          "value": this.Cat4
        },
          {
          "name": "Educação",
          "value": this.Cat3
        }
      ];
    }
  
    DivisaoCategoricaReceitas = [
      {
        "name": "Casa-Moradia",
        "value": 0
      },
      {
        "name": "Cuidado Pessoal",
        "value": 0
      },
      {
        "name": "Investimento",
        "value": 0
      },
        {
        "name": "Educação",
        "value": 0
      }
    ];
  
    onSelect(data: any): void {
      console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }
  
    onActivate(data: any): void {
      console.log('Activate', JSON.parse(JSON.stringify(data)));
    }
  
    onDeactivate(data: any): void {
      console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }
    //================================
  
    //GRAFICO DE BARRAS 
    transformacaoHistDiario(){
      this.multi = []
      this.DadosReceitas.forEach((dados) =>{
                      this.multi.push(
                              {
                              "name":dados.Data,
                              "series": [
                              {
                                  "name": dados.Categoria,
                                  "value": dados.Valor
                              },
                              ]
                          })             
                      
                  }
              )
          }
  
          transformacaoHistMensal(){
            this.multi = []
            let conv
            let Mes
            let listaMes:any = []
            this.DadosReceitas.forEach((dados) =>{
                            conv  = dados.Data.split('/')
                            Mes =  conv[1] //Ordenar antes de colocar na variável      
                            listaMes.push(
                                    {
                                    "name":Mes,
                                    "series": [
                                    {
                                        "name": dados.Categoria,
                                        "value": dados.Valor
                                    },
                                    ]
                                })
                            listaMes.sort((a:any, b:any) => { b.name - a.name })
                            console.log(listaMes)
                            this.multi = listaMes               
  
                            
                            
                        }
                    )
                }
  
    
    multi = [
      {
        "name": "0",
        "series": [
          {
            "name": "0",
            "value": 0
          }
        ]
      }
    ];
  
  
  }
  
