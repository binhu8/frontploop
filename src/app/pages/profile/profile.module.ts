import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { AvatarModule } from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserMostLikedPostsComponent } from './user-most-liked-posts/user-most-liked-posts.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { HeaderModule } from '../home/layout/header/header.module';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { CommentsModule } from '../home/layout/feed-container/comments/comments.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RightContainerModule } from '../home/layout/right-container/right-container.module';


@NgModule({
  declarations: [
    ProfileComponent,
    UserDetailsComponent,
    UserMostLikedPostsComponent,
    UserPostsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AvatarGroupModule,
    AvatarModule,
    ButtonModule,
    DividerModule,
    RouterModule,
    HeaderModule,
    CardModule,
    MenuModule,
    CommentsModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextareaModule,
    RightContainerModule
  ]
})
export class ProfileModule { }
