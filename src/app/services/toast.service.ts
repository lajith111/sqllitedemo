import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(public toastController: ToastController) {}

  async presentToast(message: any, color = 'success') {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000,
      position: 'bottom',
      mode:'ios'
    });
    toast.present();
  }

  async presentErrorToast(message: any, color = 'danger') {
    const toast = await this.toastController.create({

      message,
      color,
      duration: 2000,
      position: 'bottom' ,
      mode:'ios'
    });
    toast.present();
  }

}
