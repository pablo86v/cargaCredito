import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CargaCreditoPage } from '../carga-credito/carga-credito';
import { SaldoPage } from '../saldo/saldo';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MenuPage');
  }

  CargarCredito(){
    this.navCtrl.push(CargaCreditoPage);
  }

  VisualizarSaldo(){
    this.navCtrl.push(SaldoPage);
  }

  Desloguear(){
    localStorage.clear();
    this.navCtrl.push(LoginPage);
  }
}
