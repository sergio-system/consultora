import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GrupoProvider } from '../../providers/grupo/grupo';
import { CatalogoProvider } from '../../providers/catalogo/catalogo';
import { ProdutoProvider } from '../../providers/produto/produto';
import { ControleProvider } from '../../providers/controle/controle';
import { FuncoesProvider } from '../../providers/funcoes/funcoes';

@IonicPage()
@Component({
  selector: 'page-produto-inclui',
  templateUrl: 'produto-inclui.html',
})
export class ProdutoIncluiPage {
  grupos: Array<{ codigo, descricao }>;
  catalogos: Array<{ codigo, descricao }>;
  codigo; any;
  grupoproduto: any;
  catalogoproduto: any;
  descricao: string;
  preco: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public grupoProvider: GrupoProvider,
    public catalogoProvider: CatalogoProvider,
    public produtoProvider: ProdutoProvider,
    public controle: ControleProvider,
    public Funcoes:FuncoesProvider) { }

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

  async inclui() {
    this.codigo = await this.controle.pegaInicial("Produto");
    if (this.catalogoproduto ==undefined){
      this.Funcoes.alerta("Inclusão de Produto","Falta selecionar o Catágolo");
      return;
    }
    if (this.grupoproduto==undefined){
      this.Funcoes.alerta("Inclusão de Produto","Falta selecionar o Grupo");
      return;
    }
    if (this.descricao==undefined||this.descricao==""){
      this.Funcoes.alerta("Inclusao de Produtos", "Falta a Descricao");
      return;
    }
    if (this.preco==undefined){
      this.Funcoes.alerta("Inclusão de Produtos","Falta definir o preço");
      return;
    }
      this.produtoProvider.inclui(this.codigo,
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
