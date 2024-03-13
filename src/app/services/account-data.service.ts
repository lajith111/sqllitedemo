import { Injectable } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
//const baseUrl = `${environment.apiUrl}/api/v1`;


@Injectable()
export class AccountDataService {

   constructor(private httpClient: HttpClient,private toastService: ToastService) { }

  
    //  downloadAccountsByAgent(): Observable<IAccountDownload> {

    //   return this.httpClient.get<Result<IAccountDownload>>(baseUrl+ '/Account/DownloadAccountsByAgent')
    //               .pipe(map( (res: any) => res.data));

    //  }

    

}
