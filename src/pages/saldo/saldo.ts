import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CargaCreditoProvider } from '../../providers/carga-credito/carga-credito';

/**
 * Generated class for the SaldoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saldo',
  templateUrl: 'saldo.html',
})
export class SaldoPage {
  public arrRecargas;
  public saldo = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private servicioCargaCredito: CargaCreditoProvider) {
                this.TraerRecargas();
                this.arrRecargas.forEach(element => {
                  if (element.usuario == localStorage.getItem("usuario"))
                    this.saldo = this.saldo + element.credito;        
                });  
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad SaldoPage');
  }

  private TraerRecargas() {
    this.servicioCargaCredito.getRecargas().subscribe(
      data => {
        this.arrRecargas = data;
        //this.loading.dismiss();
      },
      err => console.error(err),
      () => console.log(this.arrRecargas)
    );
  }

  Desloguear(){
    localStorage.clear();
    this.navCtrl.push(LoginPage);
  }

}
