import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CatalogoProvider } from '../../providers/catalogo/catalogo';
import { FuncoesProvider } from '../../providers/funcoes/funcoes';

/**
 * Generated class for the CatalogoIncluiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catalogo-inclui',
  templateUrl: 'catalogo-inclui.html',
})
export class CatalogoIncluiPage {
  codigo:any;
  descricao:string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public catalogoProvider:CatalogoProvider,
              public Funcoes:FuncoesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalogoIncluiPage');
  }

  inclui() {
    return (this.catalogoProvider.tem(this.codigo))
           .then((Retorno:boolean)=>{
             if (Retorno){
                 this.Funcoes.alerta("Erro na Inclusão", "Código do Catálogo já existe");
                 this.navCtrl.popToRoot();
             }
             else
             {
                 this.catalogoProvider.inclui(this.codigo, this.descricao);
                 this.navCtrl.popToRoot();
             }
            })
           .catch((e)=>alert("Erro no teste")); 
  }
  cancela(){
    this.navCtrl.popToRoot();
  }

  testacodigo(){
    return (this.catalogoProvider.tem(this.codigo))
    .then((Retorno:boolean)=>{
    if (Retorno){
       this.Funcoes.alerta("Erro na Inclusão", "Código Já existe");
       this.navCtrl.popToRoot();
    }
    })

  }


}
