import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(
    private messageService: MessageService
  ){

  }

  ngOnInit(): void {

  }

  created(){
    this.messageService.add({key: 'bc', severity:'success', summary: 'Sucesso', detail: 'Usuário criado com sucesso'});
  }
}
