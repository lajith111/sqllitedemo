import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { MenuController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor( private menuCtrl: MenuController,
      private router:Router,

    private toastService:ToastService,
    private alertService:AlertService,
   // private androidPermissions: AndroidPermissions
    ) { }
   
  ngOnInit() {

  }

  async ionViewWillEnter() {
    this.menuCtrl.enable(false);  
  //  await  this.getPermissionPS();
   // await  this.getPermissionPN(); 
  
  }


  /*
  async getPermissionPS() {

    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );
   
    if (!hasPermission) {
      
     return await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );
   
    }
  }



  async getPermissionPN() {

    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_NUMBERS
    );
   
    if (!hasPermission) {
      
      return await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_NUMBERS
      );
   
    }
  }
*/
}
