import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftComponent } from './left.component';



@NgModule({
  declarations: [
    LeftComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LeftComponent
  ]
})
export class LeftModule { }
