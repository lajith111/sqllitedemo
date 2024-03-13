
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      
      {
        path: 'offline',
        children: [
          {
                path: '',
               loadChildren: () => import('../tabs/offline/offline.module').then(m => m.OfflinePageModule),
          }
        ]     
      },

      
          
      {
        path: '',
        redirectTo: '/tabs/offline',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRouter {}
