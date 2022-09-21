import { Component, OnInit } from '@angular/core';
import { AlertmodalService } from 'src/app/service/alert/alertmodal.service';
import { AuthService } from 'src/app/service/auth.service';
import { Usuario } from 'src/app/service/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario = new Usuario


  constructor(private authService:AuthService,
              private modalService:AlertmodalService) { }

  ngOnInit(): void {
  }

  fazerLogin(usuario:Usuario){
   this.authService.fazerLogin(this.usuario)
   
   if(this.authService.usuarioAutenticado == true){

   } else if( this.authService.usuarioAutenticado == false ){
   
    this.modalService.showAlertDanger(`O usuário "${this.usuario.nome}" não foi identificado, Registre ou tente novamente`)
    
   }
  }

}
