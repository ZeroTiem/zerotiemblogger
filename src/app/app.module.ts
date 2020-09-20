import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeComponent } from './home/home.component';

import { ArticleContentComponent } from './article-content/article-content.component';

import { NETComponent } from './net/net.component';
import { OtherComponent } from './other/other.component';
import { AngularComponent } from './angular/angular.component';

import { CustomPipe } from './pipe/custompipe.module';

import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ArticleContentComponent,
    NETComponent,
    AngularComponent,
    OtherComponent,
  ],
  imports: [
    BrowserModule,
    NgxGoogleAnalyticsModule.forRoot(environment.ga.code),
    NgxGoogleAnalyticsRouterModule,
    AppRoutingModule,
    HttpClientModule,
    CustomPipe
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})


export class AppModule { }
