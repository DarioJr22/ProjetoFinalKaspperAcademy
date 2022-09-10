import { Despesas } from "src/app/service/despesas";
import { KaizenService } from "src/app/service/kaizen.service";



export class conversaoDadosGraficos{

    DadosDespesas:Despesas[] = []
    
    constructor(private kaizenService:KaizenService){}


    getDespesas(){
        this.kaizenService.getDespesas().subscribe((data)=>{console.log(this.DadosDespesas = data, 'Converte pai')})
      }
    
    transformacao(){
        this.DadosDespesas.forEach((dados) =>{
                        this.conversor = [
                                {
                                "name":dados.Categoria,
                                "series": [
                                {
                                    "name": dados.Data,
                                    "value": dados.Valor
                                },
                                ]
                            }                 
                        ]
                    }
                )
            }

    

  conversor =  [
        {
          "name": "Germany",
          "series": [
            {
              "name": "2010",
              "value": 7300000
            },
            {
              "name": "2011",
              "value": 8940000
            }
          ]
        }
      ];

}