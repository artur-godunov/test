import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ErrorsModule } from "./modules/shared/components/errors/errors.module";
import { HeaderModule } from "./modules/shared/components/header/header.module";

import { environment, Environment } from "../environments";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ErrorsModule,
    HeaderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: Environment, useValue: environment },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
