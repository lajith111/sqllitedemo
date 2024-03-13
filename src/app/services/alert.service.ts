import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(public alertController: AlertController) {}


  async presentAlert(header: string, message: string) {

    const alert= await this.alertController.create({
            header,
            message,
            buttons:['Ok'],
            mode:'ios',
            backdropDismiss: false 
          });

         await alert.present();

  }


  async presentAlertConfirm(header: string, message: string) {
    let choice: any;
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'No',
          role: 'no'
        },
        {
          text: 'Yes',
          role: 'yes'
        }
      ],
      mode:'ios',
      backdropDismiss: false 
    });

    await alert.present();
    await alert.onDidDismiss().then(data => {
      choice = data;
    });
    return choice;
  }


}
