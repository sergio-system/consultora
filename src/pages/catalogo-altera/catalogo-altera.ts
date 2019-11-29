import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CatalogoProvider } from '../../providers/catalogo/catalogo';
import { FuncoesProvider } from '../../providers/funcoes/funcoes';

/**
 * Generated class for the CatalogoAlteraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catalogo-altera',
  templateUrl: 'catalogo-altera.html',
})
export class CatalogoAlteraPage {
  codigo: any;
  descricao: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public catalogoProvider: CatalogoProvider,
    public Funcoes:FuncoesProvider) {
      this.codigo=navParams.get("codigo");
      this.descricao=navParams.get("descricao");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalogoAlteraPage');
  }

  altera() {
    this.catalogoProvider.altera(this.codigo, this.descricao);
    this.navCtrl.popToRoot();
  }

  deleta(){
    this.catalogoProvider.deleta(this.codigo);
    this.navCtrl.popToRoot();
  }

  cancela(){
    this.navCtrl.popToRoot();
  }


}
