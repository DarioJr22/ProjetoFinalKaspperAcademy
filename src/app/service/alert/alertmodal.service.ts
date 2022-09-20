import { Injectable } from '@angular/core';
import { BsModalService } from "./../../../../node_modules/ngx-bootstrap/modal";
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { fa1 } from '@fortawesome/free-solid-svg-icons';


export enum AlertTypes{
DANGER = 'danger',
WARNING = 'warning',
SUCCESS = 'success'

}

@Injectable({
  providedIn: 'root'
})
export class AlertmodalService {

  constructor(private modalService:BsModalService) { }
  

  private showAlert(message:string, type:string){
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent)
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

  }

  showAlertDanger(message:string){
    this.showAlert(message,AlertTypes.DANGER)
  }

  showAlertSuccess(message:string){
    this.showAlert(message,AlertTypes.SUCCESS)
  }
  showAlertWarning(message:string){
    this.showAlert(message,AlertTypes.WARNING)
  }

}
