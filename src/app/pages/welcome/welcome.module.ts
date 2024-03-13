import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WelcomePage } from './welcome.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: WelcomePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WelcomePage]
})
export class WelcomePageModule {}


