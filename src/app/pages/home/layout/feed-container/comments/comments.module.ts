import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsComponent } from './comments.component';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { AvatarModule } from 'primeng/avatar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CommentsComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ChipModule,
    AvatarModule,
    InputTextareaModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    CommentsComponent
  ]
})
export class CommentsModule { }
