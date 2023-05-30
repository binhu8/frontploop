import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RightContainerComponent } from './right-container.component';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    RightContainerComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    AvatarModule,
    ButtonModule,

  ],
  exports: [
    RightContainerComponent
  ]
})
export class RightContainerModule { }
