import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { StorageService } from './services/storage.service';
import { AccountDataService } from './services/account-data.service';
import { DatabaseService } from './services/database.service';
import { NetworkService } from './services/network.service';
import { LoaderService } from './services/loading.service';

import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { InitializeAppService } from './services/initialize.app.service';
import { SQLiteService } from './services/sqlite.service';
import { DbnameVersionService } from './services/dbname-version.service';
import { ToastService } from './services/toast.service';

import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';


export function initializeFactory(init: InitializeAppService) {
  return () => init.initializeApp();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SharedModule,         // Shared (multi-instance) objects
  ],

  providers: [
   
    BluetoothSerial,
  
    File,SMS,AndroidPermissions,
    ToastService,
    SQLiteService,
    InitializeAppService,
    StorageService,
    DbnameVersionService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_INITIALIZER, useFactory: initializeFactory, deps: [InitializeAppService], multi: true },
    
    NetworkService,
    LoaderService,
    AccountDataService,
    DatabaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


