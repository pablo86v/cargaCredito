import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/*
  Generated class for the CargaCreditoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CargaCreditoProvider {

  private qrObservable : FirebaseListObservable<any[]> = this.db.list('/codigoQR');
  private recargasObservable : FirebaseListObservable<any[]> = this.db.list('/recargas');

  constructor(public http: Http, private db: AngularFireDatabase) {
    //console.log('Hello CargaCreditoProvider Provider');
  }

  
  public getqrCode()
  {
    return this.qrObservable;
  }

  public postAgregarCredito(usuario, credito)
  {
    this.recargasObservable.push({usuario:usuario, credito:credito});
  }

  public getRecargas()
  {
    return this.recargasObservable;
  }
}
