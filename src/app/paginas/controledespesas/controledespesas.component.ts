import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { treemapSquarify } from 'd3';
import { Despesas } from 'src/app/service/despesas';
import { KaizenService } from 'src/app/service/kaizen.service';
import { conversaoDadosGraficos } from './conversaodadosgraficos';
import { dadosGraficosHorizontal } from './dadosgraficos';



declare var window:any


@Component({
  selector: 'app-controledespesas',
  templateUrl: './controledespesas.component.html',
  styleUrls: ['./controledespesas.component.css']
})
export class ControledespesasComponent implements OnInit {


  @Output()carregamentoTabelas_Cards:EventEmitter<any> = new EventEmitter
  @Output()DadosGraficos:EventEmitter<any> = new EventEmitter
  @Output()cardsCarregados:EventEmitter<any> = new EventEmitter

  controleDeCarregamento_Cards = true
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


  Modal:any
  DadosModal:any [] = []
  TotalModal:any
  ModalInclusaoDesp:any
  ModalInclusaoRece:any
  ModalDeleteDesp:any
  ModalDeleteRece:any
  ModalAltDesp:any
  ModalAltRece:any
  
   //Atributos para o gráfico de despesas -- Despesas // Gráfico de pizza 
   viewPizza: [number,number] = [680,200];
   viewBarraHorizontal: [number,number] =  [500,200];
  ListaCategorica:any [] = []
  gradient: boolean = false;
  showLegend: boolean = true;
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
  viewEmpilhadas: [number,number] =  [700,350];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradientEmp: boolean = false;
  showLegendEmp: boolean = true;
  showXAxisLabel: boolean = false;
  showYAxisLabel: boolean = false;
  animations: boolean = true;
  showDataLabel:boolean = true;
  

  //===============================
  //grafico de barras 
  view_barVertical:[number,number] = [700,350]
  legendPosition:LegendPosition = LegendPosition.Below
  ValorTotalDespesas:number = 0
    
  


  



  constructor(private kaizenService:KaizenService) { }

  ngOnInit(): void {

    //Carregamento Gráfico de pizza.
    
 this.carregarForm()   }

 carregarForm(){
  this.getDespesas()
  this.esperarDespesa("Casa-moradia") 
  this.esperarDespesa("Cuidado Pessoal")
  this.esperarDespesa("Educação")
  this.esperarDespesa("Investimento")
  this.setarInformacoes()
  this.esperar()
  this.Modal = new window.bootstrap.Modal(document.getElementById('Modal'))
    this.esperar()
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
            if( nomeCategoria == "Casa-moradia" ){
              Valor +=dados.Valor
              Lista.push(`${dados.id} - ${dados.Data} - ${dados.Categoria} - ${dados.Valor}`)
              this.Cat1 = Valor
              this.Lista1 = Lista
            }
            if( nomeCategoria == "Cuidado Pessoal" ){
              Valor +=dados.Valor
              Lista.push(`${dados.id} - ${dados.Data} - ${dados.Categoria} - ${dados.Valor}`)
              this.Cat2 = Valor
              this.Lista2 = Lista

            }
            if( nomeCategoria == "Educação" ){
              Valor +=dados.Valor
              Lista.push(`${dados.id} - ${dados.Data} - ${dados.Categoria} - ${dados.Valor}`)
              this.Cat3 = Valor
              this.Lista3 = Lista

            }
            if( nomeCategoria == "Investimento" ){
              Valor +=dados.Valor
              Lista.push(`${dados.id} - ${dados.Data} - ${dados.Categoria} - ${dados.Valor}`)
              this.Cat4 = Valor
              this.Lista4 = Lista
              
              
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
    let lista:any[] = []
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
    lista = this.DivisaoCategoricaDesp

    this.DivisaoCategoricaDesp = lista.sort((a,b)=>{
      if(a.value > b.value){
        return -1
      } else {
        return 1
      }
    })
   
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
    if(data.label == 'Investimento' ){
      this.DadosModal = this.Lista4
      this.TotalModal = `Total = ${data.value}`
      this.Modal.show()
    } else if(data.label == 'Casa-Moradia'){
      this.DadosModal = this.Lista1
      this.TotalModal = `Total = ${data.value}`
      this.Modal.show()
    } else if(data.label == 'Educação'){
      this.DadosModal = this.Lista3
      this.TotalModal = `Total = ${data.value}`
      this.Modal.show()
    } else if(data.label == 'Cuidado Pessoal'){
      this.DadosModal = this.Lista2
      this.TotalModal = `Total = ${data.value}`
      this.Modal.show()
    }



    
   /*  console.log('Item clicked', JSON.parse(JSON.stringify(data))) */;
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  //================================

  //GRAFICO DE BARRAS - Separadas
  transformacaoHistDiario(){
    this.multi = []
    this.single = []
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
                        this.single.push(
                          {
                            "name": dados.Data,
                            "value": dados.Valor
                          })            
                    
                }
            )
        }

        transformacaoHistMensal(){
          this.multi = []
          this.single = []
          let conv
          let Mes
          let listaMesMult:any[] = []
          let valor:number = 0
          let ListaSingleMeses:any[] = []
           this.DadosDespesas.forEach((dados) =>{
                          conv  = dados.Data.split('/')
                          Mes =  conv[1] //Ordenar antes de colocar na variável  
                          valor += dados.Valor    
                          listaMesMult.push(
                                  {
                                  "name":Mes,
                                  "series": [
                                  {
                                      "name": dados.Categoria,
                                      "value": dados.Valor
                                  },
                                  ]
                                }
                               
                              )
                            
                            this.single.push(
                                {
                                  "name": Mes,
                                  "value":valor
                                })


                      
                                listaMesMult.sort((a,b)=>{
                            if(a.name < b.name){
                              return -1
                            } else {
                              return 1
                            }
                          })
                         console.log(listaMesMult)
                          this.multi = listaMesMult             
                  }
                  
            
                )
                

                
              }

              transformacaoHistMensal_Barras(){
                this.multi = []
                this.single = []
                let conv
                let Mes
                let listaMesMult1:any[] = []
                let valor:number = 0
                let ListaSingleMeses:any[] = []
                
                 this.DadosDespesas.forEach((dados)=>{
                  conv  = dados.Data.split('/')
                  Mes =  conv[1] //Ordenar antes de colocar na variável  
                  
                  if(listaMesMult1.indexOf(Mes)!= -1){
                    valor += dados.Valor
                    listaMesMult1.push({
                    "name":Mes,
                    "value":valor
                  })

                }


            
                 })

                 console.log(listaMesMult1);
                 
                      
                    }
            
  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }

  ]

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

 

  esperar(){
    setTimeout(()=>{
      if (this.DadosDespesas.length > 0){this.transformacaoHistDiario()}
      else{this.esperar()}
      },2000
    )
  }


  //___Controle de Carregamento Abashome
  carregou_Abas(event:any){
    setTimeout(() => {
      if (this.DadosDespesas.length > 0) {
            this.controleDeCarregamento_Cards = false
            this.cardsCarregados.emit(this.controleDeCarregamento_Cards)
            console.log(this.controleDeCarregamento_Cards, 'carregou os cards');
            
      }else{this.carregou_Abas(this.controleDeCarregamento_Cards)}
    }, 3500);
  }

  carregouAgoraMeAjuda(event:any){
    
    this.carregarDados()
    this.cardsCarregados.emit(true)
    

  }

  carregarDados(){
    this.carregou_Abas(this.controleDeCarregamento_Cards)
    this.getDespesas()
    this.carregarForm()

  }
  
}/////
