import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication-guard.guard';
import { GuardLoggedUserGuard } from './guard-logged-user.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [GuardLoggedUserGuard],
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  { path: 'teste', loadChildren: () => import('./pages/home/layout/header/header.module').then(m => m.HeaderModule) },
  { path: 'teste', loadChildren: () => import('./pages/home/layout/left-container/left-container.module').then(m => m.LeftContainerModule) },
  { path: 'test', loadChildren: () => import('./pages/home/layout/right-container/right-container.module').then(m => m.RightContainerModule) },
  { path: 'teste', loadChildren: () => import('./pages/home/layout/feed-container/feed-container.module').then(m => m.FeedContainerModule) },
  { path: 'teste', loadChildren: () => import('./pages/home/layout/feed-container/comments/comments.module').then(m => m.CommentsModule) },
  {
    path: 'profile/:id',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
