import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FuncoesProvider } from '../../providers/funcoes/funcoes';
import { GrupoProvider } from '../../providers/grupo/grupo';


@IonicPage()
@Component({
  selector: 'page-grupo-altera',
  templateUrl: 'grupo-altera.html',
})
export class GrupoAlteraPage {
  codigo:any;
  descricao:string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public gropoProvider:GrupoProvider,
              public Funcoes:FuncoesProvider) {
                this.codigo=navParams.get("codigo");
                this.descricao=navParams.get("descricao");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrupoAlteraPage');
  }
  altera() {
    this.gropoProvider.altera(this.codigo, this.descricao);
    this.navCtrl.popToRoot();
  }

  deleta(){
    this.gropoProvider.deleta(this.codigo);
    this.navCtrl.popToRoot();
  }

  cancela(){
    this.navCtrl.popToRoot();
  }

}
