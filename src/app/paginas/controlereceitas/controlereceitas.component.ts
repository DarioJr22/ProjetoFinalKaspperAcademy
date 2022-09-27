import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Color,DataItem, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { Despesas } from 'src/app/service/despesas';

import { KaizenService } from 'src/app/service/kaizen.service';
import { Receitas } from 'src/app/service/receitas';
import { dadosGraficosHorizontal } from '../controledespesas/dadosgraficos';
declare var window:any
@Component({
  selector: 'app-controlereceitas',
  templateUrl: './controlereceitas.component.html',
  styleUrls: ['./controlereceitas.component.css']
})
export class ControlereceitasComponent implements OnInit {

  @Output()carregamentoTabelas_Cards:EventEmitter<any> = new EventEmitter
  @Output()DadosGraficos:EventEmitter<any> = new EventEmitter
  @Output()cardsCarregados:EventEmitter<any> = new EventEmitter

  controleDeCarregamento_Cards = true
  carregando = true 
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
  colorScheme:Color = {name:'asd',
    selectable:true,
    group:ScaleType.Quantile,
    domain: ['#259814']
  };
  
  CategoriaList:string[] = 
  [ '',
    'Salário',
    'Investimentos',
    'Empreendimentos',
    'Freelas',
    'Outros'
  ]

  //=======================================================================
  //Atributos para o gráfico de despesas -- Despesas // Gráfico de Barras empilhadas
  viewEmpilhadas: [number,number] =  [800,400];
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
  view_barVertical:[number,number] = [800,400]
  legendPosition:LegendPosition = LegendPosition.Below
  ValorTotalDespesas:number = 0
    
  


  



  constructor(private kaizenService:KaizenService) { }

  ngOnInit(): void {

    //Carregamento Gráfico de pizza.
    
 this.carregarForm()   }

 carregarForm(){
  this.getDespesas()
  this.esperarReceitas("Salário") 
  this.esperarReceitas("Investimentos")
  this.esperarReceitas("Empreendimentos")
  this.esperarReceitas("Freelas")
  this.esperarReceitas("Outros")
  this.setarInformacoes()
  this.esperar()
  this.Modal = new window.bootstrap.Modal(document.getElementById('Modal'))
    this.esperar()
  this.esperarCarregando()
} 


  getDespesas(){
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
    let lista:any[] = []
    this.DivisaoCategoricaReceitas = [
      {
        "name": "Salário",
        "value": this.Cat1
      },
      {
        "name": "Investimentos",
        "value": this.Cat2
      },
      {
        "name": "Empreendimentos",
        "value":  this.Cat3
      },
        {
        "name": "Freelas",
        "value":this.Cat4
      }
      ,
        {
        "name": "Outros",
        "value": this.Cat5
      }
    ];
    lista = this.DivisaoCategoricaReceitas

    this.DivisaoCategoricaReceitas = lista.sort((a,b)=>{
      if(a.value > b.value){
        return -1
      } else {
        return 1
      }
    })
   
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
    if(data.label == 'Salário' ){
      this.DadosModal = this.Lista1
      this.TotalModal = `Total = ${data.value}`
      this.Modal.show()
    } else if(data.label == 'Investimentos'){
      this.DadosModal = this.Lista2
      this.TotalModal = `Total = ${data.value}`
      this.Modal.show()
    } else if(data.label == 'Empreendimentos'){
      this.DadosModal = this.Lista3
      this.TotalModal = `Total = ${data.value}`
      this.Modal.show()
    } else if(data.label == 'Freelas'){
      this.DadosModal = this.Lista4
      this.TotalModal = `Total = ${data.value}`
      this.Modal.show()
    } else if(data.label == 'Outros'){
      this.DadosModal = this.Lista5
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
    let newData:any
    let conversao
    let dia
    let mes
    let ano
    let listaMeses:any [] = []
    let handlerDay:any [] = []
    let newDataMulti
    this.multi = []
    this.single = []
    this.DadosReceitas.forEach((dados,i,array) =>{
                            //Tranformando Data em Data
                            conversao = dados.Data.split('/')
                            dia = parseInt(conversao[0])
                            mes = parseInt(conversao[1])
                            ano = parseInt(conversao[2])
                            newData = new Date(ano,mes -1 ,dia)
                            

                            //Lista com os meses preenchidos 
                            let handlerMonth:any [] = []
                            handlerMonth.push(newData.getMonth()+1)
                            handlerMonth = [...new Set(handlerMonth)]
                            handlerMonth 
                            //Lista Dias
                            
                            handlerDay.push(newData.getDay())
                            console.log(handlerDay);
                            /* handlerDay = [...new Set(handlerDay)] */
                           
                            

                            
                          

                            
                    this.multi.push(
                            {
                            "name":newData,
                            "series": [
                            {
                                "name": dados.Categoria,
                                "value": dados.Valor
                            },
                            ]
                        })
                        if(newData == newData){
                        this.single.push(
                          {
                            "name": newData,
                            "value": dados.Valor
                          })            
                    
               
                       
                      }},
                       
                   
                      
            )
          
            this.multi.sort((a:any,b:any)=>{
              return a.name.getTime() - b.name.getTime()
             } )

          this.single.sort((a:any,b:any)=>{
           return a.name.getTime() - b.name.getTime()
          } 
        )
       
       
          
 
        
        }


   

    
        
        transformacaoHistMensal(){
          //Variáveis de Mês 
          let newData:any
          let conversao
          let dia
          let mes
          let ano
           let handlerMonth:any [] = []
          /* this.multi = [] */
          this.single = []
       
          let conv
          let Mes:any
          let listaMesMult:any[] = []
          
          let valor:number = 0
          let ListaSingleMeses:any[] = []
          //Lista de meses initários
          

          //Preenche dados do grafico de barras empilhadas
           this.DadosReceitas.forEach((dados,index,array) =>{
                          conversao = dados.Data.split('/')
                          dia = parseInt(conversao[0])
                          mes = parseInt(conversao[1])
                          ano = parseInt(conversao[2])
                          newData = new Date(ano,mes -1 ,dia)

                          //Lista com os meses preenchidos 
                     /*     
                          handlerMonth.push(newData.getMonth()+1)
                          handlerMonth = [...new Set(handlerMonth)] */
                       

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
                       
                          
  
                          listaMesMult.sort((a,b)=>{
                            if(a.name < b.name){
                              return -1
                            } else {
                              return 1
                            }
                          }
                        )
                          this.multi = listaMesMult             
                  }
                  
            
                )
                

this.transformacaoHistMensal_Barras()
              }


transformacaoHistMensal_Barras(){
                //Variáveis de Mês 
                let newData:any
                let conversao
                let dia
                let mes
                let ano
                let handlerMonth:any [] = []
                let idsPreenchidos:any[] = []
                let indiceIds=-1
                this.single = []
                let conv
                let Mes:any
                let indiceLista=-1
                
                let listaSingleMeses:dadosGraficosHorizontal[] = [
                  
                ]
                //Lista de meses initários
                
      
                //Preenche dados do grafico de barras empilhadas
                 this.DadosReceitas.forEach((dados,index,array) =>{
                                conversao = dados.Data.split('/')
                                dia = parseInt(conversao[0])
                                mes = parseInt(conversao[1])
                                ano = parseInt(conversao[2])
                                newData = new Date(ano,mes -1 ,dia)
      
                                //Lista com os meses preenchidos 
                                handlerMonth.push(newData.getMonth()+1);
                                handlerMonth = [...new Set(handlerMonth)]
                                handlerMonth})

                                //Iteração da lista de meses
                                handlerMonth.forEach((Meses,i,arrMeses) => {
                                  //Iteração dos dados utilizando meses
                                  this.DadosReceitas.forEach((dados,i,arr) => {
                                     //Coleta de dados
                                      if (idsPreenchidos.length < arr.length) {
                                        idsPreenchidos = []
                                        arr.forEach((id) => {idsPreenchidos.push(id.id)
                                        }
                                      )
                                      
                                        
                                      }
                                      conv  = dados.Data.split('/')
                                      Mes =  parseInt(conv[1]) // Mês
                                      indiceIds= idsPreenchidos.indexOf(dados.id)
                                      
                                    
                                      if (Meses === Mes ) {
                                      indiceLista = listaSingleMeses.findIndex((e) => e.name == Mes)
                             
                                       if (indiceLista != -1 ) {
                                       listaSingleMeses[indiceLista].value +=dados.Valor
                                       
                                      }else  if(indiceLista== -1 ){

                                        listaSingleMeses.push(
                                          {
                                            "name": Mes,
                                            "value": dados.Valor
                                          }
                                        )
                                      }
                                    } 
                                  }
                                ) 
                              }
                            );

                            listaSingleMeses.sort((a,b)=>{
                              if(a.name < b.name){
                                return -1
                              } else {
                                return 1
                              }
                            }
                          ) 
                        this.single =  listaSingleMeses
                      }

                   
  single:DataItem[]= [ 
    {
      "name":'0',
      "value":0
    }
  ]

  multi = [
    {
      "name": new Date(),
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
      if (this.DadosReceitas.length > 0){this.transformacaoHistMensal()}
      else{this.esperar()}
      },2000
    )
  }


  //___Controle de Carregamento Abashome
  carregou_Abas(event:any){
    setTimeout(() => {
      if (this.DadosReceitas.length > 0) {
            this.controleDeCarregamento_Cards = false
            this.cardsCarregados.emit(this.controleDeCarregamento_Cards)
            
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

  
  esperarCarregando(){
    setTimeout(() => {
      this.carregando = false 
    }, 10000);
  }
  
  }
  
