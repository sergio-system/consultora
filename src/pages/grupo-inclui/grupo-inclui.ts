import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GrupoProvider } from '../../providers/grupo/grupo';
import { FuncoesProvider } from '../../providers/funcoes/funcoes';

/**
 * Generated class for the GrupoIncluiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grupo-inclui',
  templateUrl: 'grupo-inclui.html',
})
export class GrupoIncluiPage {
  codigo:any;
  descricao:string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public grupoProvider:GrupoProvider,
              public Funcoes:FuncoesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrupoIncluiPage');
  }
  
  inclui() {
    return (this.grupoProvider.tem(this.codigo))
      .then((Retorno: boolean) => {
        if (Retorno) {
          this.Funcoes.alerta("Erro na Inclusão", "Código do Catálogo já existe");
          this.navCtrl.popToRoot();
        }
        else {
          this.grupoProvider.inclui(this.codigo, this.descricao);
          this.navCtrl.popToRoot();
        }
      })
      .catch((e) => alert("Erro no teste"));
  }
  cancela() {
    this.navCtrl.popToRoot();
  }
  
  testacodigo(){
    return (this.grupoProvider.tem(this.codigo))
    .then((Retorno:boolean)=>{
    if (Retorno){
       this.Funcoes.alerta("Erro na Inclusão", "Código Já existe");
       this.navCtrl.popToRoot();
    }
    })
  }

}
