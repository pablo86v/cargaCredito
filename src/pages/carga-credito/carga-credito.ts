import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController } from 'ionic-angular';
import { CargaCreditoProvider } from '../../providers/carga-credito/carga-credito';

import { MenuPage } from '../menu/menu';

/**
 * Generated class for the CargaCreditoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carga-credito',
  templateUrl: 'carga-credito.html',
})
export class CargaCreditoPage {

  public arrCodigosQR;
  public arrRecargas;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private toast: ToastController,
    private servicioCargaCredito: CargaCreditoProvider) {
    this.TraerCodigosQR();
    this.TraerRecargas();
    this.escanear();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CargaCreditoPage');
  }

  private TraerCodigosQR() {
    this.servicioCargaCredito.getqrCode().subscribe(
      data => {
        this.arrCodigosQR = data;
        //this.loading.dismiss();
      },
      err => console.error(err),
      () => console.log(this.arrCodigosQR)
    );
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

  escanear() {
    this.barcodeScanner.scan().then((barcodeData) => {
      //alert(barcodeData.text);
      this.validarExistencia(barcodeData.text);
    });
  }

  validarExistencia(codigo) {
    let saldo = 0;

    this.arrCodigosQR.forEach(element => {   
      let codStr = new String(codigo);
      let idStr = new String (element.ID);
      // alert(codStr);   
      // alert(idStr);   
      // if (codStr == idStr.toString()){
      //   alert("1");
      // }
      // if (codStr.toString() == idStr){ 
      //   alert("2");
      // }

      // if (codStr.toString() == idStr.toString()){ 
      //   alert("3");
      // }

      // if (codStr === idStr.toString()){
      //   alert("4");
      // }
      // if (codStr.toString() === idStr){ 
      //   alert("5");
      // }

      // if (codStr.toString() === idStr.toString()){ 
      //   alert("6");
      // }
    
      // if (codStr.trim() === idStr.trim().toString()){
      //   alert("7");
      // }
      // if (codStr.trim().toString() === idStr.trim()){ 
      //   alert("8");
      // }

      // if (codStr.trim().toString() === idStr.trim().toString()){ 
      //   alert("9");
      // }
      // if (codStr.trim() == idStr.trim().toString()){
      //   alert("10");
      // }
      // if (codStr.trim().toString() == idStr.trim()){ 
      //   alert("11");
      // }

      // if (codStr.trim().toString() == idStr.trim().toString()){ 
      //   alert("12");
      // }

      if (codStr.trim().toString() == idStr.trim().toString()){   
        // alert("Iguales");   
        this.servicioCargaCredito.postAgregarCredito(localStorage.getItem("usuario"), element.Valor);

        this.TraerRecargas();
        this.arrRecargas.forEach(element2 => {
          if (element2.usuario == localStorage.getItem("usuario"))
            saldo = saldo + element2.credito;
        });

        this.mensajeToast("Se cargó satisfactoriamente " +  element.Valor + ", su saldo actual es: " + saldo);
      }
    });
    this.navCtrl.push(MenuPage);
  }

 
  mensajeToast(message: string) {
    let toast = this.toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
