import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {
  MatTableModule
} from '@angular/material';
import { AppComponent, DataDialogComponent } from './app.component';

import { TestAppHttpService, httpServiceCreator } from './services/http-service';
import { AppComponentService } from './app.component.service';

@NgModule({
  declarations: [
    AppComponent,
    DataDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  entryComponents: [DataDialogComponent],
  providers: [
    AppComponentService,
    {
      provide: TestAppHttpService,
      useFactory: httpServiceCreator,
      deps: [HttpClient],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
