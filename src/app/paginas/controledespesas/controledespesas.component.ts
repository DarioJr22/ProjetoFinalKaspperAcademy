import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Despesas } from 'src/app/service/despesas';
import { KaizenService } from 'src/app/service/kaizen.service';
import { conversaoDadosGraficos } from './conversaodadosgraficos';

@Component({
  selector: 'app-controledespesas',
  templateUrl: './controledespesas.component.html',
  styleUrls: ['./controledespesas.component.css']
})
export class ControledespesasComponent implements OnInit {
  //Dados de Despesas
  DadosDespesas:Despesas[] = []
  //Categorias -- Despesas // Gráfico de pizza 
  Cat1:number = 0
  Lista1:any[] = []

  Cat2:number = 0
  Lista2:any[] = []

  Cat3:number = 0
  Lista3:any[] = []

  Cat4:number = 0
  Lista4:any[] = []
  
   //Atributos para o gráfico de despesas -- Despesas // Gráfico de pizza 
  view: [number,number] = [700,200];
  ListaCategorica:any [] = []
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  colorScheme:Color = {name:'MyScheme',
    selectable:true,
    group:ScaleType.Quantile,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  CategoriaList:string[] = 
  [
    'Casa-moradia',
    'Cuidado Pessoal',
    'Investimento',
    'Educação'
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

  
  
  


  constructor(private kaizenService:KaizenService) { }

  ngOnInit(): void {
    this.getDespesas()
    //Carregamento Gráfico de pizza.
    this.esperarDespesa("Casa-Moradia") 
    this.esperarDespesa("Cuidado Pessoal")
    this.esperarDespesa("Educação")
    this.esperarDespesa("Investimento")
    this.setarInformacoes()

  
  }

  getDespesas(){
    this.kaizenService.getDespesas().subscribe((data)=>{console.log(this.DadosDespesas = data)})
  }


  //Gráfico de Pizza
  //Calculo
  somatorioCategoricoDesp(nomeCategoria:string){
    let Valor = 0
    let Lista:any = []
    this.DadosDespesas.forEach((dados)=>{
          if(nomeCategoria == dados.Categoria){
            if( nomeCategoria == "Casa-Moradia" ){
              Valor +=dados.Valor
              Lista.push(`${dados.id} - ${dados.Data} - ${dados.Categoria} - ${dados.Valor}`)
              this.Cat1 = Valor
            }
            if( nomeCategoria == "Cuidado Pessoal" ){
              Valor +=dados.Valor
              Lista.push(`${dados.id} - ${dados.Data} - ${dados.Categoria} - ${dados.Valor}`)
              this.Cat2 = Valor
            }
            if( nomeCategoria == "Educação" ){
              Valor +=dados.Valor
              Lista.push(`${dados.id} - ${dados.Data} - ${dados.Categoria} - ${dados.Valor}`)
              this.Cat3 = Valor
            }
            if( nomeCategoria == "Investimento" ){
              Valor +=dados.Valor
              Lista.push(`${dados.id} - ${dados.Data} - ${dados.Categoria} - ${dados.Valor}`)
              this.Cat4 = Valor
            }
        }
      }
    )
    
    return Valor
    
  }
    
  esperarDespesa(nomeCategoria:string){
    setTimeout(()=>{
      if (this.DadosDespesas.length > 0){this.somatorioCategoricoDesp(nomeCategoria)}
      else{this.esperarDespesa(nomeCategoria)}
      },2000
    )
  }
  setarInformacoes(){
    setTimeout(()=>{
      if (this.DadosDespesas.length > 0){}
      this.atualizarInformacoes()
    },3000
  )
}

  atualizarInformacoes(){
    this.DivisaoCategoricaDesp = [
      {
        "name": "Casa-Moradia",
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

  DivisaoCategoricaDesp = [
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
    this.DadosDespesas.forEach((dados) =>{
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
          this.DadosDespesas.forEach((dados) =>{
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
                          listaMes.sort((a:any,b:any ) => {a -b})
                          console.log(listaMes);
                          
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
