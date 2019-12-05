import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { GiftGivingModule } from './features/gift-giving/gift-giving.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    GiftGivingModule,
    // order matters - AppRoutingModule needs to be last
    // because the default route will kick in prematurely
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      // these run-time checks will probably be enabled by default in future releases
      runtimeChecks: {
        strictActionImmutability: !environment.production,
        strictActionSerializability: true,
        strictStateImmutability: true,
        strictStateSerializability: true // this one will cause the default RouterStore to fail.
      }
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
