import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CatalogoPage } from '../pages/catalogo/catalogo';
import { GrupoPage } from '../pages/grupo/grupo';
import { VendaPage } from '../pages/venda/venda';
import { ProdutoPage } from '../pages/produto/produto';
import { ClientePage } from '../pages/cliente/cliente';
import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public dbprovider:DatabaseProvider) {
    dbprovider.createrdatabase()
    .then(()=>{
      this.abreVenda();
    })
    .catch(e=>{
      alert('Banco não foi Criado: '+e);
      this.abreVenda();
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Catálogo', component: CatalogoPage },
      { title: 'Grupo de Produtos', component: GrupoPage },
      { title: 'Produtos', component: ProdutoPage },
      { title: 'Clientes', component: ClientePage },
      { title: 'Venda', component: VendaPage }
    ];

  }

  public abreVenda(){
    this.rootPage=VendaPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
