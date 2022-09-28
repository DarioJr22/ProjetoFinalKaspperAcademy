import { Component, Input, OnInit } from '@angular/core';
import { faArrowsToEye, faChartBar, faGaugeHigh, faGears, faList12 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input('corSideBar')corSideBar = 'Red'
  Cor:string = ''

  Dashboard = faGaugeHigh
  Eyes = faArrowsToEye
  List = faList12
  Analisis = faChartBar
  Config = faGears 
 

  constructor() { }

  ngOnInit(): void {
    
  }

}
