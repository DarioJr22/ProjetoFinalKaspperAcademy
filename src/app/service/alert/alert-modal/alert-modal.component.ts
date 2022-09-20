import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {
          
  triangulo = faTriangleExclamation
  circuloSucesso = faCircleCheck
  circuloExclamacao = faCircleExclamation

  @Input() type = '';
  @Input() message: string ='';
  @Input() icon: string ='';

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  onClose() {
    this.bsModalRef.id = 1     
    this.bsModalRef.hide()
  }

}