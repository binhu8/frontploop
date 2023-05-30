import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { HeaderModule } from './header/header.module';
import { LeftContainerModule } from './left-container/left-container.module';
import { RightContainerModule } from './right-container/right-container.module';
import { FeedContainerModule } from './feed-container/feed-container.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    LeftContainerModule,
    RightContainerModule,
    FeedContainerModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
