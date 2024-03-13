import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabsRouter } from './tabs.router';
import { TabsPage } from './tabs.page';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [CommonModule,IonicModule,TabsRouter,SharedModule],
  declarations: [TabsPage]
//  entryComponents: []
})

export class TabsPageModule {}
