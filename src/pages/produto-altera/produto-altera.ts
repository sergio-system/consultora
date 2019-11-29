import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CatalogoProvider } from '../../providers/catalogo/catalogo';
import { GrupoProvider } from '../../providers/grupo/grupo';
import { ProdutoProvider } from '../../providers/produto/produto';
import { FuncoesProvider } from '../../providers/funcoes/funcoes';


@IonicPage()
@Component({
  selector: 'page-produto-altera',
  templateUrl: 'produto-altera.html',
})
export class ProdutoAlteraPage {
  grupos: Array<{ codigo, descricao }>;
  catalogos: Array<{ codigo, descricao }>;
  codigo; any;
  grupoproduto: any;
  catalogoproduto: any;
  descricao: string;
  preco: number;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public catalogoProvider:CatalogoProvider,
              public grupoProvider:GrupoProvider,
              public produtoProvider:ProdutoProvider,
              public Funcoes:FuncoesProvider) {
    this.codigo=navParams.get("codigo");
    this.catalogoproduto=navParams.get("catalogoproduto");
    this.grupoproduto=navParams.get("grupoproduto");
    this.descricao=navParams.get("descricao");
    this.preco=navParams.get("preco");
  }
  carregacatalogo() {
    return this.catalogoProvider.listar()
      .then((data: any) => {
        this.catalogos = [];
        for (let i = 0; i < data.length; i++) {
          this.catalogos.push({
            codigo: data[i]["Codigo"],
            descricao: data[i]["Descricao"]
          })
        }
        return this.catalogos;
      })
  }


  carregagrupo() {
    return this.grupoProvider.listar()
      .then((data: any) => {
        this.grupos = [];
        for (let i = 0; i < data.length; i++) {
          this.grupos.push({
            codigo: data[i]["Codigo"],
            descricao: data[i]["Descricao"]
          })
        }
        return this.grupos;
      })
  }

   async deleta() {
    this.produtoProvider.deleta(this.codigo);
    this.navCtrl.popToRoot();
  }
 
 

  async altera() {
    if (this.catalogoproduto == undefined) {
      this.Funcoes.alerta("Alteração de Produto", "Falta selecionar o Catágolo");
      return;
    }
    if (this.grupoproduto == undefined) {
      this.Funcoes.alerta("Alteração de Produto", "Falta selecionar o Grupo");
      return;
    }
    if (this.descricao == undefined || this.descricao == "") {
      this.Funcoes.alerta("Alteração de Produtos", "Falta a Descricao");
      return;
    }
    if (this.preco == undefined) {
      this.Funcoes.alerta("Alteração de Produtos", "Falta definir o preço");
      return;
    }
    this.produtoProvider.altera(this.codigo,
                                this.catalogoproduto,
                                this.grupoproduto,
                                this.descricao,
                                this.preco);
    this.navCtrl.popToRoot();
  }

  cancela() {
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {
    this.carregacatalogo();
    this.carregagrupo();
  }

}
