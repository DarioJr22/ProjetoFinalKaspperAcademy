import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Despesas } from 'src/app/service/despesas';
import { KaizenService } from 'src/app/service/kaizen.service';
import { conversaoDadosGraficos } from './conversaodadosgraficos';



declare var window:any


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
   viewPizza: [number,number] = [500,200];
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
  viewEmpilhadas: [number,number] =  [500,200];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradientEmp: boolean = false;
  showLegendEmp: boolean = true;
  showXAxisLabel: boolean = false;

  showYAxisLabel: boolean = false;

  animations: boolean = true;
  showDataLabel:boolean = true

  
  
  //===============================
  //grafico de barras 
  view_barVertical:[number,number] =  [500,200]


  



  constructor(private kaizenService:KaizenService) { }

  ngOnInit(): void {
    this.getDespesas()
    //Carregamento Gráfico de pizza.
    this.esperarDespesa("Casa-moradia") 
    this.esperarDespesa("Cuidado Pessoal")
    this.esperarDespesa("Educação")
    this.esperarDespesa("Investimento")
    this.setarInformacoes()
    this.carregarForm()

  }

  carregarForm(){
    this.Modal = new window.bootstrap.Modal(document.getElementById('Modal'))
    this.esperar()
    this.ModalInclusaoDesp = new window.bootstrap.Modal(document.getElementById('ModInclusaoDesp'))
    this.ModalInclusaoRece = new window.bootstrap.Modal(document.getElementById('ModInclusaoRece'))
    this.ModalDeleteDesp = new window.bootstrap.Modal(document.getElementById('ModExclusãoDesp'))
    this.ModalDeleteRece = new window.bootstrap.Modal(document.getElementById('ModExclusãoRece'))
    this.ModalAltDesp = new window.bootstrap.Modal(document.getElementById('ModAlteracaoDesp'))
    this.ModalAltRece = new window.bootstrap.Modal(document.getElementById('ModAlteracaoRece'))

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
                              
                            this.single.push(
                                {
                                  "name": Mes,
                                  "value": dados.Valor
                                })
                          listaMes.sort((a:any, b:any) => { b.name - a.name })
                          console.log(listaMes)
                          this.multi = listaMes               
                  }
                )
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


  //___Controle de Despesas Abashome
  //Variáveis
  idDelete:number = 0
  idEdit:number = 0
 
  ValorTotalDespesas:number = 0 

  displayedColumnsDespesas:String[] = 
  ['id',
  'Data',
  'Categoria',
  'SubCategoria',
  'Valor',
  'FonteDespesas',
  'Observacao',
  'Delete/Edit']

  displayedColumnsReceitas:String[] = 
  ['id_R',
  'Data_R',
  'Categoria_R',
  'SubCategoria_R',
  'Valor_R',
  'FonteReceitas_R',
  'Observacao_R',
  'Deletar/Alterar_R']

  CreateDadosDespesas:Despesas ={
    Data:'',
    Categoria:'',
    Observacao:'',
    FonteDespesa:'',
    SubCategoria:'',
    Valor:0
  }

 

  createDespesas(){
    this.kaizenService
    .createDespesa(this.CreateDadosDespesas)
    .subscribe((data) => console.log(data))
    this.ModalInclusaoDesp.hide()
    setTimeout(() => {this.getDespesas(),this.calcularTotalDespesas()}, 2000);
  }

  //Form



  updateDespesas(){
    this.kaizenService.updateDespesas(this.CreateDadosDespesas)
        .subscribe((data)=>{ console.log(`${this.CreateDadosDespesas.id} - Alterado`);
        })
  }

  abrirDeleteModalDespesas(id:any){
    this.idDelete =id
    this.ModalDeleteDesp.show()
    console.log(this.idDelete)
  }

  deleteDespesa(){
    this.kaizenService
    .deleteDespesa(this.idDelete)
    .subscribe((data) => {this.DadosDespesas = this.DadosDespesas.filter(ID => ID.id !== this.idDelete)
                          this.ModalDeleteDesp.hide()})
    
  }

  abriralteracaoDespesa(){
    this.ModalAltDesp.show()

  }

  abriralteracaoReceitas(){
    this.ModalAltRece.show()

  }


  //Form - Inclusão 
  CapturaIdDesp(event:any){
    this.CreateDadosDespesas.id = event
   
  }

  CapturaDataDesp(event:any){
    this.CreateDadosDespesas.Data = event
    console.log(this.CreateDadosDespesas.Data);
  }

  CapturaCategoriaDesp(event:any){
    this.CreateDadosDespesas.Categoria = event
    console.log(this.CreateDadosDespesas.Categoria);
  }

  CapturaSubCategoriaDesp(event:any){
    this.CreateDadosDespesas.SubCategoria = event
    console.log(this.CreateDadosDespesas.SubCategoria);
  }

  CapturaFonteDespesa(event:any){
    this.CreateDadosDespesas.FonteDespesa = event
    console.log(this.CreateDadosDespesas.FonteDespesa);
  }

  CapturaValorDesp(event:any){
    let convers = parseFloat(event)
    this.CreateDadosDespesas.Valor = convers
    console.log(this.CreateDadosDespesas.Valor);
  }

  CapturaObservacaoDesp(event:any){
    this.CreateDadosDespesas.Observacao = event
    console.log(this.CreateDadosDespesas.Observacao);
  }

  abrirCreateModalDespesas(){
    this.ModalInclusaoDesp.show()
  }

 //Calculo

 calcularTotalDespesas(){
  this.ValorTotalDespesas = 0
  this.DadosDespesas.forEach((dados) =>{
    return this.ValorTotalDespesas += dados.Valor})
  console.log(this.ValorTotalDespesas);
  
}


}/////
