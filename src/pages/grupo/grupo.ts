import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GrupoProvider } from '../../providers/grupo/grupo';
import { FuncoesProvider } from '../../providers/funcoes/funcoes';
import { GrupoIncluiPage } from '../grupo-inclui/grupo-inclui';
import { GrupoAlteraPage } from '../grupo-altera/grupo-altera';

/**
 * Generated class for the GrupoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grupo',
  templateUrl: 'grupo.html',
})
export class GrupoPage {
  grupos: any[] = [];
  public carregador;
  public reflesher;
  public isreflesher: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public grupoProvider:GrupoProvider,
              public loadingCtrl: LoadingController,
              public Funcoes:FuncoesProvider ) {
  }

  ionViewDidEnter() {
    this.listaGrupos();
  }

  listaGrupos() {
  //  this.AbreCarregando();
    this.grupoProvider.listar()
      .then((result: any[]) => {
        this.grupos = result;
      })
      .catch((e) => alert('Deu erro na listagem: ' + e));
  //  this.FechandoCarregando();
    if (this.isreflesher) {
      this.isreflesher = false;
      this.reflesher.complete();
    }

  }

  incluiGrupo() {
    this.navCtrl.push(GrupoIncluiPage);
  }

  alteraGrupo(codigo: any, descricao: string) {
    this.navCtrl.push(GrupoAlteraPage, { codigo, descricao });
  }

  doRefresh(refresher) {
    this.reflesher = refresher;
    this.isreflesher = true;
    this.listaGrupos();
  }

  AbreCarregando() {
    this.carregador = this.loadingCtrl.create({
      content: "Carregando"
    });
    this.carregador.present();
  }
  FechandoCarregando() {
    this.carregador.dismiss();
  }

}
