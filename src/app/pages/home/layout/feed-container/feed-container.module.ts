import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedContainerComponent } from './feed-container.component';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import {RippleModule} from 'primeng/ripple';
import { CommentsModule } from './comments/comments.module';
import { ReactiveFormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    FeedContainerComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    AvatarModule,
    InputTextareaModule,
    ButtonModule,
    MenuModule,
    RippleModule,
    CommentsModule,
    ReactiveFormsModule,
    ConfirmDialogModule
  ],
  exports: [
    FeedContainerComponent
  ],
  providers: [
    ConfirmationService
  ]
})
export class FeedContainerModule { }
