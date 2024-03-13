import { BehaviorSubject, Observable } from 'rxjs';
import { NgZone } from '@angular/core';
import { Network } from '@capacitor/network';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NetworkService {

  isOnline$: Observable<boolean>;
  private statusSubject = new BehaviorSubject<boolean>(false);

  constructor(
     private zone: NgZone,
  ) {
    Network.getStatus().then(status => this.statusSubject.next(status.connected));
    this.isOnline$ = this.statusSubject.asObservable();

    Network.addListener('networkStatusChange', (status) => {

        this.zone.run(() => {
            this.statusSubject.next(status.connected);
        });
      });
  }
}
