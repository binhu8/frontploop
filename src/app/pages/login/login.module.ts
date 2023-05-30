import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import { LeftModule } from './left/left.module';
import { RightModule } from './right/right.module';
import { RouterModule } from '@angular/router';
import {MessageModule} from 'primeng/message';
import { MessageService } from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    LeftModule,
    RightModule,
    RouterModule,
    MessageModule,
    MessagesModule,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class LoginModule { }
