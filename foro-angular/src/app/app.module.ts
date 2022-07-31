import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';

import { PanelModule } from './panel/components/panel.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { UserEditComponent } from './components/user-edit/user-edit.component'
import { AngularFileUploaderModule } from "angular-file-uploader";


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    PanelModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
