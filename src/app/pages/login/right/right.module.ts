import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RightComponent } from './right.component';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox'
import { ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { RouterLink } from '@angular/router';
import {DialogModule} from 'primeng/dialog'
import { SignupModule } from '../../signup/signup.module';
import { InputSwitchModule} from 'primeng/inputswitch'
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    RightComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CheckboxModule,
    ReactiveFormsModule,
    RippleModule,
    RouterLink,
    DialogModule,
    SignupModule,
    InputSwitchModule,
    MessagesModule,
    MessageModule
  ],
  exports: [
    RightComponent
  ],
  providers: [
    MessageService
  ]
})
export class RightModule { }
