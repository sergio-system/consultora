import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FuncoesProvider } from '../../providers/funcoes/funcoes';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { ClienteIncluiPage } from '../cliente-inclui/cliente-inclui';
import { ClienteAlteraPage } from '../cliente-altera/cliente-altera';

@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {
  clientes: any[] = [];
  clientesconsulta: any[] = [];
  public carregador;
  public reflesher;
  public isreflesher: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public clienteProvider: ClienteProvider,
    public loadingCtrl: LoadingController,
    public Funcoes: FuncoesProvider) {
  }

  ionViewDidEnter() {
    this.listaClientes();
  }

  listaClientes()//rotina para abrir o Carreganddo
  {
  //  this.AbreCarregando();
    this.clienteProvider.listar()
      .then((result: any[]) => {
        this.clientes = result;
        this.clientesconsulta = result;
      })
      .catch((e) => alert('Deu erro na listagem: ' + e));
  //  this.FechandoCarregando();
    if (this.isreflesher) {
      this.isreflesher = false;
      this.reflesher.complete();
    }

  }

  incluiCliente() {
    this.navCtrl.push(ClienteIncluiPage);
  }

  alteraProduto(telefone: string,
                nome:string,
                endereco:string,
                bairro:string,
                cidade:string,
                uf:string,
                sexo:string,
                diaaniversario:number,
                mesaniversario:number){
    this.navCtrl.push(ClienteAlteraPage, { telefone, nome, endereco, bairro, cidade, uf, sexo, diaaniversario, mesaniversario});
  }

  doRefresh(refresher) {
    this.reflesher = refresher;
    this.isreflesher = true;
    this.listaClientes();
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
      this.clientesconsulta = this.clientes.filter((cont) => {
        return (cont.Descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.clientesconsulta = this.clientes;
    }
  }


}
