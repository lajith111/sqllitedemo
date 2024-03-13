import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,  
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  declarations: [
   
  ],
  providers: [ [DatePipe], 
  ]

})
export class SharedModule {

  constructor(){
  }

}
