import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioAutenticado:boolean = false 


  constructor(private router:Router) { }

  fazerLogin(usuario:Usuario){
      if(usuario.nome === 'dario@kaizen.com' &&
        usuario.senha === '12345'){

          this.usuarioAutenticado = true
          this.router.navigate(['/home'])
        }else{
          this.usuarioAutenticado = false
          console.log('NÃO AUTENTICADO')
        }

  }
}
