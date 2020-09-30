import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx'
import { LoadingSpinComponent } from './shared/loading-spin/loading-spin.component';

const firebaseConfig = {
  
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ BrowserModule, IonicModule.forRoot(), AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule ,AppRoutingModule, HttpClientModule],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
