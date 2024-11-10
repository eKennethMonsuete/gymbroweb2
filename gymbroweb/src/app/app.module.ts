import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MeasuresFormComponent } from './modules/measures/measures-form/measures-form/measures-form.component';
import { MeasuresModule } from './modules/measures/measures.module';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

    ButtonModule,
    PanelModule,
    BrowserAnimationsModule,
    InputTextModule,
    MessageModule,
    SharedModule,
    MeasuresModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
