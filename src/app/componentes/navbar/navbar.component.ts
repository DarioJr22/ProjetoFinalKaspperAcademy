import { Component, OnInit } from '@angular/core';
import { faArrowsToEye, faChartBar, faGaugeHigh, faGears, faList12 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  //Icons 

  Dashboard = faGaugeHigh
  Eyes = faArrowsToEye
  List = faList12
  Analisis = faChartBar
  Config = faGears 


  constructor() { }

  ngOnInit(): void {
  }

}
