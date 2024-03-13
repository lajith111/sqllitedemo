import { Component,ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { LoaderService } from './services/loading.service';
import { App } from '@capacitor/app';
import { NetworkService } from './services/network.service';
import { ToastService } from './services/toast.service';
import { AlertService } from './services/alert.service';
// import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
// import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy{

   userName='';
   isNetworkAvailable=false;
   public isMenuEnabled:boolean = true;
   public selectedIndex = 0;

  constructor(
    private platform: Platform,
    private loaderService: LoaderService,
    private router: Router,
    private networkService: NetworkService,
    private toastService:ToastService,
    private alertService:AlertService,private menuController:MenuController
  ) {
    
     this.getNetwork();
     this.initApp();
    
    
      this.getNetwork();
    
    }


    ngOnInit() {

    }
  

  close() {
        this.menuController.toggle();
  }

  async initApp() {
   
   // await this.platform.ready();
    //await  SplashScreen.hide();
      
  }

  getNetwork(): void {
    this.networkService.isOnline$.subscribe({
          next: (result: any)  => {
            this.isNetworkAvailable = result;
          },
          error: () => { },
          complete: () => { },
      });
}


   ngOnDestroy() {
  
  }
}

