import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'angular-ngrx-starter'
    }),
    ServerModule,
    AppModule,
    ModuleMapLoaderModule
  ],
  providers: [
    // Add universal-only providers here
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
