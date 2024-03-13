import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { menuController } from '@ionic/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-tab',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
 
  selectedTab:any;

  cdBtnColor:string='success';
  isScan:boolean=false;
  private unsubscribe$ = new Subject<void>();


  constructor(private router: Router,
    
    private changeDetectorRef: ChangeDetectorRef,private storage: StorageService,
    private alertService:AlertService,
    public  modalCtrl: ModalController
    ) {}
    ngOnInit() {

   
  }

  
  ionViewDidEnter() {
  }


  
async scanDevices()
{
  let devices:any=[]; 
   try
   {

      this.isScan=true;
    
     
      this.isScan=false;
    }
    catch(err)
    { 
      this.isScan=false;
    } 
  
}

tabClicked(e:any) {
    this.selectedTab = e.tab;
}

}

