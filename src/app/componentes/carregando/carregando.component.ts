import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-carregando',
  templateUrl: './carregando.component.html',
  styleUrls: ['./carregando.component.css']
})
export class CarregandoComponent implements OnInit {
  @Input('carregando')carregando = true 
  color:ThemePalette = 'warn'

  constructor() { }

  ngOnInit(): void {
  }


}
