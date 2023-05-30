import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { InputTextModule } from 'primeng/inputtext';
import {DividerModule} from 'primeng/divider';
import {AvatarModule} from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import {MenuModule} from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    DividerModule,
    AvatarModule,
    ChipModule,
    MenuModule,
    RippleModule,
    CardModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class HeaderModule { }
