import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftContainerComponent } from './left-container.component';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LeftContainerComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    DividerModule,
    RouterModule
  ],
  exports: [
    LeftContainerComponent
  ]
})
export class LeftContainerModule { }
