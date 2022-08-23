import { Component } from '@angular/core';
import { faArrowCircleUp, faCoffee, faFaceAngry, faYinYang } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kaizen';

  faCoffe = faCoffee
  Unicorn = faArrowCircleUp
  yinyang = faYinYang
  face = faFaceAngry

}
