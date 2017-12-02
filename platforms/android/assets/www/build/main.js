webpackJsonp([4],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CargaCreditoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { Observable } from 'rxjs/Observable';

/*
  Generated class for the CargaCreditoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var CargaCreditoProvider = (function () {
    function CargaCreditoProvider(http, db) {
        this.http = http;
        this.db = db;
        this.qrObservable = this.db.list('/codigoQR');
        this.recargasObservable = this.db.list('/recargas');
        //console.log('Hello CargaCreditoProvider Provider');
    }
    CargaCreditoProvider.prototype.getqrCode = function () {
        return this.qrObservable;
    };
    CargaCreditoProvider.prototype.postAgregarCredito = function (usuario, credito) {
        this.recargasObservable.push({ usuario: usuario, credito: credito });
    };
    CargaCreditoProvider.prototype.getRecargas = function () {
        return this.recargasObservable;
    };
    return CargaCreditoProvider;
}());
CargaCreditoProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
], CargaCreditoProvider);

//# sourceMappingURL=carga-credito.js.map

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CargaCreditoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_carga_credito_carga_credito__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_menu__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the CargaCreditoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CargaCreditoPage = (function () {
    function CargaCreditoPage(navCtrl, navParams, barcodeScanner, toast, servicioCargaCredito) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcodeScanner = barcodeScanner;
        this.toast = toast;
        this.servicioCargaCredito = servicioCargaCredito;
        this.TraerCodigosQR();
        this.TraerRecargas();
        this.escanear();
    }
    CargaCreditoPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad CargaCreditoPage');
    };
    CargaCreditoPage.prototype.TraerCodigosQR = function () {
        var _this = this;
        this.servicioCargaCredito.getqrCode().subscribe(function (data) {
            _this.arrCodigosQR = data;
            //this.loading.dismiss();
        }, function (err) { return console.error(err); }, function () { return console.log(_this.arrCodigosQR); });
    };
    CargaCreditoPage.prototype.TraerRecargas = function () {
        var _this = this;
        this.servicioCargaCredito.getRecargas().subscribe(function (data) {
            _this.arrRecargas = data;
            //this.loading.dismiss();
        }, function (err) { return console.error(err); }, function () { return console.log(_this.arrRecargas); });
    };
    CargaCreditoPage.prototype.escanear = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            //alert(barcodeData.text);
            _this.validarExistencia(barcodeData.text);
        });
    };
    CargaCreditoPage.prototype.validarExistencia = function (codigo) {
        var _this = this;
        var saldo = 0;
        this.arrCodigosQR.forEach(function (element) {
            var codStr = new String(codigo);
            var idStr = new String(element.ID);
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
            if (codStr.trim().toString() == idStr.trim().toString()) {
                // alert("Iguales");   
                _this.servicioCargaCredito.postAgregarCredito(localStorage.getItem("usuario"), element.Valor);
                _this.TraerRecargas();
                _this.arrRecargas.forEach(function (element2) {
                    if (element2.usuario == localStorage.getItem("usuario"))
                        saldo = saldo + element2.credito;
                });
                _this.mensajeToast("Se cargó satisfactoriamente " + element.Valor + ", su saldo actual es: " + saldo);
            }
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */]);
    };
    CargaCreditoPage.prototype.mensajeToast = function (message) {
        var toast = this.toast.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    return CargaCreditoPage;
}());
CargaCreditoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-carga-credito',template:/*ion-inline-start:"C:\Users\Pablillo\Desktop\facultad\PPS  2017 - Agosto\cargaCredito\src\pages\carga-credito\carga-credito.html"*/'<!--\n  Generated template for the CargaCreditoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Carga Credito</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Pablillo\Desktop\facultad\PPS  2017 - Agosto\cargaCredito\src\pages\carga-credito\carga-credito.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_carga_credito_carga_credito__["a" /* CargaCreditoProvider */]])
], CargaCreditoPage);

//# sourceMappingURL=carga-credito.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SaldoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_carga_credito_carga_credito__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SaldoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SaldoPage = (function () {
    function SaldoPage(navCtrl, navParams, servicioCargaCredito) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.servicioCargaCredito = servicioCargaCredito;
        this.saldo = 0;
        this.TraerRecargas();
        this.arrRecargas.forEach(function (element) {
            if (element.usuario == localStorage.getItem("usuario"))
                _this.saldo = _this.saldo + element.credito;
        });
    }
    SaldoPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad SaldoPage');
    };
    SaldoPage.prototype.TraerRecargas = function () {
        var _this = this;
        this.servicioCargaCredito.getRecargas().subscribe(function (data) {
            _this.arrRecargas = data;
            //this.loading.dismiss();
        }, function (err) { return console.error(err); }, function () { return console.log(_this.arrRecargas); });
    };
    SaldoPage.prototype.Desloguear = function () {
        localStorage.clear();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    return SaldoPage;
}());
SaldoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-saldo',template:/*ion-inline-start:"C:\Users\Pablillo\Desktop\facultad\PPS  2017 - Agosto\cargaCredito\src\pages\saldo\saldo.html"*/'<!--\n  Generated template for the SaldoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>saldo</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding style="background-color:bisque">\n  <br>\n  <br>\n  <ion-grid align="center">\n    <ion-row class="mt-3">\n      <ion-col>\n        <img src="./assets/icon/saldo.png" width="75">\n        <hr>\n        <h3>{{saldo}}</h3>\n      </ion-col>\n    </ion-row>\n    <br>\n    <button ion-button block class="btn mt-3" color="danger" (click)="Desloguear()">Salir</button>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Pablillo\Desktop\facultad\PPS  2017 - Agosto\cargaCredito\src\pages\saldo\saldo.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_carga_credito_carga_credito__["a" /* CargaCreditoProvider */]])
], SaldoPage);

//# sourceMappingURL=saldo.js.map

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 149;

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/carga-credito/carga-credito.module": [
		404,
		3
	],
	"../pages/login/login.module": [
		407,
		2
	],
	"../pages/menu/menu.module": [
		406,
		1
	],
	"../pages/saldo/saldo.module": [
		405,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 190;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(291);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_carga_credito_carga_credito__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_carga_credito_carga_credito__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_menu_menu__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_saldo_saldo__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__firebase__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_http__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_barcode_scanner__ = __webpack_require__(191);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';

//import { Observable } from 'rxjs/Observable';









//import { Http } from '@angular/http';


var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            // AboutPage,
            // ContactPage,
            // HomePage,
            // TabsPage,
            __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_carga_credito_carga_credito__["a" /* CargaCreditoPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_menu_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_saldo_saldo__["a" /* SaldoPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/carga-credito/carga-credito.module#CargaCreditoPageModule', name: 'CargaCreditoPage', segment: 'carga-credito', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/saldo/saldo.module#SaldoPageModule', name: 'SaldoPage', segment: 'saldo', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_11_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_13__firebase__["a" /* CONFIG */]),
            __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_14__angular_http__["b" /* HttpModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            // AboutPage,
            // ContactPage,
            // HomePage,
            // TabsPage,
            __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_carga_credito_carga_credito__["a" /* CargaCreditoPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_menu_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_saldo_saldo__["a" /* SaldoPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_7__providers_carga_credito_carga_credito__["a" /* CargaCreditoProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { TabsPage } from '../pages/tabs/tabs';

var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\Pablillo\Desktop\facultad\PPS  2017 - Agosto\cargaCredito\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\Pablillo\Desktop\facultad\PPS  2017 - Agosto\cargaCredito\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CONFIG; });
var CONFIG = {
    apiKey: "AIzaSyAnNs4_JXq5HEnC6Wr0kPgp-gg_PKKWOAs",
    authDomain: "cargacredito-18cc1.firebaseapp.com",
    databaseURL: "https://cargacredito-18cc1.firebaseio.com",
    projectId: "cargacredito-18cc1",
    storageBucket: "cargacredito-18cc1.appspot.com",
    messagingSenderId: "201076586036"
};
//# sourceMappingURL=firebase.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_menu__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { TabsPage } from '../tabs/tabs';
// import { CargaCreditoPage } from '../carga-credito/carga-credito';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.Login = function (usuario, pass, tipo) {
        //console.log(this.usuario);
        if ((this.usuario == "") || (this.usuario == undefined) || (this.usuario == null) ||
            (this.usuario == "") || (this.usuario == undefined) || (this.usuario == null)) {
            this.presentToast("Debe ingresar usuario y contraseña");
        }
        else {
            localStorage.setItem("usuario", usuario);
            localStorage.setItem("password", pass);
            localStorage.setItem("tipoUsuario", tipo);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__menu_menu__["a" /* MenuPage */]);
        }
    };
    LoginPage.prototype.HardcodearUsuario = function () {
        console.log("entró");
        console.log(this.tipo);
        if (this.tipo == 'Invitado') {
            this.usuario = 'Invitado';
            this.password = '22';
        }
        else if (this.tipo == 'Admin') {
            this.usuario = 'Admin';
            this.password = '11';
        }
        else if (this.tipo == 'Usuario') {
            this.usuario = 'Usuario';
            this.password = '33';
        }
        else if (this.tipo == 'J1') {
            this.usuario = 'J1';
            this.password = '44';
        }
        else if (this.tipo == 'J2') {
            this.usuario = 'J2';
            this.password = '55';
        }
    };
    LoginPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000
        });
        toast.present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\Pablillo\Desktop\facultad\PPS  2017 - Agosto\cargaCredito\src\pages\login\login.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Inicio de sesión\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding >\n  <!-- <ion-view view-title="Login" name="login-view"> -->\n        <div class="list list-inset">\n          <ion-item class="mt-3">\n            <ion-label>Usuario</ion-label>\n            <ion-input disabled [(ngModel)]="usuario" id="usuario" name="usuario"></ion-input>\n          </ion-item>\n          <ion-item class="mt-3">\n            <ion-label class="item item-input">Clave</ion-label>\n            <ion-input disabled [(ngModel)]="password" id="password" name="password" type="password"></ion-input>\n          </ion-item>\n        <ion-item class="mt-3">\n          <ion-label class = "item item-input item-select item-positive">Tipo</ion-label>   \n            <ion-select [(ngModel)]="tipo" id="tipo" name="tipo" (ngModelChange)="HardcodearUsuario()">\n                <ion-option selected>Seleccione Usuario</ion-option>\n                <ion-option>Admin</ion-option>\n                <ion-option>Invitado</ion-option>\n                <ion-option>Usuario</ion-option>\n                <ion-option>J1</ion-option>\n                <ion-option>J2</ion-option>\n            </ion-select>\n          </ion-item>\n        <button class="mt-3 btn-custom text-capitalize" round ion-button block (click)="Login(usuario, password, tipo)">Ingresar </button>\n        <!-- <button class="button button-block button-calm" (click)="Login(usuario, password, tipo)">Login</button> -->\n    </div>\n <!-- </ion-view>  -->\n</ion-content>'/*ion-inline-end:"C:\Users\Pablillo\Desktop\facultad\PPS  2017 - Agosto\cargaCredito\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__carga_credito_carga_credito__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__saldo_saldo__ = __webpack_require__(141);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MenuPage = (function () {
    function MenuPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    MenuPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad MenuPage');
    };
    MenuPage.prototype.CargarCredito = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__carga_credito_carga_credito__["a" /* CargaCreditoPage */]);
    };
    MenuPage.prototype.VisualizarSaldo = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__saldo_saldo__["a" /* SaldoPage */]);
    };
    MenuPage.prototype.Desloguear = function () {
        localStorage.clear();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    return MenuPage;
}());
MenuPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-menu',template:/*ion-inline-start:"C:\Users\Pablillo\Desktop\facultad\PPS  2017 - Agosto\cargaCredito\src\pages\menu\menu.html"*/'<!--\n  Generated template for the MenuPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Menu</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding style="background-color:bisque">\n  <div style="text-align:center">\n    <button style="background-color: transparent;" class="mt-5"> \n      <img src="./assets/icon/consultaSaldo.jpg" style="width: 150px; height: 150px" (click)="VisualizarSaldo()" />\n    </button>   \n    \n    <button style="background-color: transparent;" class="mt-5"> \n      <img src="./assets/icon/recargar.png" style="width: 150px; height: 150px" (click)="CargarCredito()" />\n    </button>\n  </div>\n  <br>\n  <br>\n  <button round ion-button block class="btn-custom mt-3 text-capitalize"  (click)="Desloguear()">Salir</button>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Pablillo\Desktop\facultad\PPS  2017 - Agosto\cargaCredito\src\pages\menu\menu.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], MenuPage);

//# sourceMappingURL=menu.js.map

/***/ })

},[274]);
//# sourceMappingURL=main.js.map