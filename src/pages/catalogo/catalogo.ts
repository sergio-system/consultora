import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import { CatalogoProvider } from '../../providers/catalogo/catalogo';
import { CatalogoIncluiPage } from '../catalogo-inclui/catalogo-inclui';
import { CatalogoAlteraPage } from '../catalogo-altera/catalogo-altera';
import { FuncoesProvider } from '../../providers/funcoes/funcoes';

@Component({
  selector: 'page-catalogo',
  templateUrl: 'catalogo.html',
})
export class CatalogoPage {
  catalogos:any[]=[];
  tipo:string;
  public carregador;
  public reflesher;
  public isreflesher: boolean = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private catalogoProvider:CatalogoProvider,
              public Funcoes:FuncoesProvider) {}

  ionViewDidEnter() {
    this.listaCatalogos();
  }

  listaCatalogos(){
  //  this.AbreCarregando();
    this.catalogoProvider.listar()
        .then((result:any[])=>{
          this.catalogos=result;
        })
        .catch((e)=>alert('Deu erro na listagem: '+e));
  //  this.FechandoCarregando();
  //  if (this.isreflesher) {
  //    this.isreflesher = false;
  //    this.reflesher.complete();
  //  }

  }

  incluiCatalogo(){
    this.navCtrl.push(CatalogoIncluiPage);
  }

  alteraCatalogo(codigo:any, descricao:string){
    this.navCtrl.push(CatalogoAlteraPage,{codigo,descricao});
  }

  doRefresh(refresher) {
    this.reflesher = refresher;
    this.isreflesher = true;
    this.listaCatalogos();
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
