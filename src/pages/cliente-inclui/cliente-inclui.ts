import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FuncoesProvider } from '../../providers/funcoes/funcoes';
import { ClienteProvider } from '../../providers/cliente/cliente';


@IonicPage()
@Component({
  selector: 'page-cliente-inclui',
  templateUrl: 'cliente-inclui.html',
})
export class ClienteIncluiPage {
  sexos: Array<{ codigo, descricao }>;
  meses: Array<{ codigo, descricao }>;
  ufs:Array<{sigla}>;
  dias:Array<{dia}>;
  telefone: string;
  nome: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  sexo: string;
  diaaniversario: number;
  mesaniversario: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public clienteProvider: ClienteProvider,
    public Funcoes: FuncoesProvider) { }



  async inclui() {
    if (this.telefone == undefined) {
      this.Funcoes.alerta("Inclusão de Cliente", "Incluir o Nome");
      return;
    }
    this.clienteProvider.inclui(this.telefone,
      this.nome,
      this.endereco,
      this.bairro,
      this.cidade,
      this.uf,
      this.sexo,
      this.diaaniversario,
      this.mesaniversario);
    this.navCtrl.popToRoot();
  }
  testatelefone(){
    return (this.clienteProvider.tem(this.telefone))
      .then((Retorno: boolean) => {
        if (Retorno) {
          this.Funcoes.alerta("Erro na Inclusão", "Telefone já cadastrado");
          this.navCtrl.popToRoot();
        }
      })
  }

  cancela() {
    this.navCtrl.popToRoot();
  }

  CarregaDias(){
    this.dias=this.Funcoes.diasdosmeses(this.mesaniversario);
  }

  ionViewDidLoad() {
    this.sexos=this.Funcoes.TabelaSexos();
    this.meses=this.Funcoes.TabelaMeses();
    this.ufs=this.Funcoes.TabelaUf();
  }


}
