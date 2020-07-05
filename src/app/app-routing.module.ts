import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleContentComponent } from './article-content/article-content.component';
import { HomeComponent } from './home/home.component';
import { NETComponent } from './net/net.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'net', component: NETComponent },
  { path: 'ArticleContent/:articleName', component: ArticleContentComponent },
  { path: 'ArticleContent/:folder/:articleName', component: ArticleContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
