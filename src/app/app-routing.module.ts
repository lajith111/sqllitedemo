import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [

  { path: 'welcome',loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule) },
  
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules/* ,enableTracing: true*/ })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
