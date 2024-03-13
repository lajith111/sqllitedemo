import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountDataService } from 'src/app/services/account-data.service';
import { AlertService } from 'src/app/services/alert.service';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loading.service';
import { NetworkService } from 'src/app/services/network.service';

import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.page.html',
  styleUrls: ['./offline.page.scss'],
})
export class OfflinePage implements OnInit ,OnDestroy{

  
 
  isDownload=false;
  isUpload=false;
  isClear=false;

  isNetworkAvailable=false;

  transactions:any[]=[];
  logs:any[]=[];

  accCount:number=0;
  tranCount:number=0;

  accLogExist:boolean=false;
  tranLogExist:boolean=false;

  currentSegment:number=1;
  private unsubscribe$ = new Subject<void>();

  total:number=0; 

 
  constructor(public accountService: AccountDataService,private storage: StorageService,

    private dbService: DatabaseService,
    private toastService: ToastService,
    private alertService: AlertService,
    private loaderService: LoaderService,
    private networkService: NetworkService,
    private router: Router) { }

    ngOnInit() {
    
      this.getNetwork();
    
      this.dbService.dbState().pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
          if(res){
           
          this.dbService.getAccounts().pipe(takeUntil(this.unsubscribe$)).subscribe({
              next: (result: any)  => { 
                  this.accCount= result.length ?? 0;                                                                              
                }
          });
    
          this.dbService.getTransactions().pipe(takeUntil(this.unsubscribe$)).subscribe({
              next: (result: any)  => { 
                  this.total=0;
                  this.transactions=result; 
                  this.tranCount= result.length ?? 0;  
                  if(this.tranCount>0)
                    this.transactions.forEach(item=> this.total += item.amount??0);                                                          
                }
          });
    
          
           this.dbService.getLogs().pipe(takeUntil(this.unsubscribe$)).subscribe({
            next: (result: any)  => { 
                this.logs=result;   
                  this.accLogExist= this.logs.some(log=>log.id===1); 
                  this.tranLogExist= this.logs.some(log=>log.id===2); 
                                                                                          
              }
           });
          }
        });
    
    }
    
    
    onLogout()
{

}
getNetwork(): void {
  this.networkService.isOnline$.pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: (result: any)  => {
          this.isNetworkAvailable = result;
        }
  });
}



async downloadAccounts()
{
  let accounts: any[]=[];

  try
  {
     
    if(!this.isNetworkAvailable)
    {
      await this.toastService.presentErrorToast('No network');
      return;
    }

    if(this.transactions?.length)
    {     
        await this.toastService.presentErrorToast('Transaction exist,canot download');
        return;
    }
        
    this.isDownload=true;

      const dt= new Date().toISOString();

      await this.loaderService.presentLoader();  
      
     await this.dbService.initiateLog(1,dt);  //1- Accounts 

     //await this.dbService.test();

      // const results = this.accountService.downloadAccountsByAgent();
      // let result= await lastValueFrom(results);

      // accounts= result.accounts;

      //   if(!accounts?.length)  //if server data will send & in client no data recieved
      //   {    
      //      await this.loaderService.dismissLoader();                
      //      await this.toastService.presentErrorToast('No Accounts exist');
      //      this.isDownload=false;   
      //      return;
      //   }
        // await Promise.all(
        //   [
        //     this.storage.store(AUTH_CONSTANTS.COLLECTION_START_KEY, result.collectionStart),
        //     this.storage.store(AUTH_CONSTANTS.COLLECTION_END_KEY, result.collectionEnd)
        //   ]);
   
          
       // await this.dbService.importAccountsTransaction(accounts);   //My Original
        await this.dbService.importAccountsTest();
         
        
        await this.loaderService.dismissLoader();

        await this.toastService.presentToast('Accounts successfully downloaded');
      
        this.isDownload=false;  
     }

    catch(err)
    {    
      
      // if (err.status == 400)
      //   await this.dbService.clearDownlodLogs();  
     
       await this.loaderService.dismissLoader();           
       this.isDownload=false;  
      
    }
   
}


async clearAccounts()
{
  
  if(!this.isNetworkAvailable)
  {
     await this.toastService.presentErrorToast('No network');
     return;
  }
     
  try
  {
  
  
    if(this.transactions?.length)
    {     
        await this.toastService.presentErrorToast('Transaction exist,canot delete accounts');
        return;
    }

    const alert= await  this.alertService.presentAlertConfirm('Alert', 'Are you sure you want to Clear?');
    if (alert.role === 'yes')
    {
      
      this.isClear=true; 
    
      await this.loaderService.presentLoader();

      // const resultObs=  this.accountService.clearAccountsByAgent();
      
        await this.dbService.clearAccounts();
        
        // await Promise.all([this.storage.remove(AUTH_CONSTANTS.COLLECTION_START_KEY),
        //   this.storage.remove(AUTH_CONSTANTS.COLLECTION_END_KEY)]);
        await this.loaderService.dismissLoader();
        await this.toastService.presentToast('Accounts cleared successfully');
    
      this.isClear=false;
    }
  }
  catch(err)
  {
       await this.loaderService.dismissLoader();
       this.isClear=false;
  }
 
}



async changeSegment(event: any) {
  
    this.currentSegment = Number(event.detail.value);
   
}
 

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
