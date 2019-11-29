import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoProvider } from '../../providers/produto/produto';
import { FuncoesProvider } from '../../providers/funcoes/funcoes';
import { ProdutoIncluiPage } from '../produto-inclui/produto-inclui';
import { ProdutoAlteraPage } from '../produto-altera/produto-altera';

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {
  produtos: any[] = [];
  produtosconsulta: any[] = [];
  public carregador;
  public reflesher;
  public isreflesher: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public produtoProvider: ProdutoProvider,
    public loadingCtrl: LoadingController,
    public Funcoes: FuncoesProvider) {
  }

  ionViewDidEnter() {
    this.listaProdutos();
  }

  listaProdutos()//rotina para abrir o Carreganddo
  {
  //  this.AbreCarregando();
    this.produtoProvider.listar()
      .then((result: any[]) => {
        this.produtos = result;
        this.produtosconsulta=result;
      })
      .catch((e) => alert('Deu erro na listagem: ' + e));
  //  this.FechandoCarregando();
    if (this.isreflesher) {
      this.isreflesher = false;
      this.reflesher.complete();
    }

  }

  incluiProduto() {
    this.navCtrl.push(ProdutoIncluiPage);
  }

  alteraProduto(codigo: any, catalogoproduto: any, grupoproduto: any, descricao: string, preco: number) {
    this.navCtrl.push(ProdutoAlteraPage, { codigo, catalogoproduto, grupoproduto, descricao, preco });
  }

  doRefresh(refresher) {
    this.reflesher = refresher;
    this.isreflesher = true;
    this.listaProdutos();
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

  pesquisa(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.produtosconsulta = this.produtos.filter((cont) => {
        return (cont.Descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.produtosconsulta = this.produtos;
    }
  }


}
