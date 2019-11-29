import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { CurrencyPipe } from '@angular/common';

@Injectable()
export class FuncoesProvider {
  hora = new Date().toLocaleTimeString().substr(0, 5);
  date: string = new Date().toLocaleDateString();
  currencyPipe: CurrencyPipe;
  meses: string[] = ["Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"];
  ufs:string[]=["AC",
                "AL",
                "AM",
                "AP",
                "BA",
                "CE",
                "DF",
                "ES",
                "GO",
                "MA",
                "PA",
                "PB",
                "PE",
                "PI",
                "PR",
                "RJ",
                "RN",
                "RO",
                "RR",
                "RS",
                "SC",
                "SP",
                "SE",
                "TO"];

  sexos: Array<{ codigo, descricao }>;
  tabelameses: Array<{ codigo, descricao }>;
  estados:Array<{sigla}>;
  dias:Array<{dia}>;
  constructor(public alertCtrl: AlertController) {
    console.log('Hello FuncoesProvider Provider');
  }

  TabelaSexos():any{
   this.sexos=[];
   let codigo="M";
   let descricao="Masculino";
   this.sexos.push({codigo,descricao});
   codigo = "F";
   descricao = "Feminino";
   this.sexos.push({ codigo, descricao });
   return this.sexos;   
  }

  TabelaMeses():any{
    this.tabelameses=[];
    for (var i=0;i<12;i++){
      let codigo=i+1;
      let descricao=this.meses[i];
      this.tabelameses.push({codigo,descricao});
    }
    return this.tabelameses;
  }

  TabelaUf():any{
    this.estados=[];
    this.ufs.forEach(uf => {
      let sigla=uf;
      this.estados.push({sigla});
    });
    return this.estados;
  }
  diasdosmeses(mes: number):any {
    this.dias = [];
    let max = 30;
    if ((mes == 1) || (mes == 3) || (mes == 5) || (mes == 7) || (mes == 8) || (mes == 10) || (mes == 12))
      max = 31;
    else
      if (mes == 2)
        max = 29;
    for (var i = 1; i <= max; i++){
      let dia=i;
      this.dias.push({ dia })
    }
    return this.dias;
  }

  alerta(titulo: string, mensagem: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensagem,
      buttons: ['OK']
    })
    alert.present();
  }

  convertdata(data: any): string {
    return data.substr(8, 2) + "/" +
      data.substr(5, 2) + "/" +
      data.substr(0, 4) + " " +
      data.substr(11, 5);
  }


  invertdata(data: any): string {
    return data.substr(6, 4) + "-" +
      data.substr(3, 2) + "-" +
      data.substr(0, 2);
  }

  pegadata(): string {
    this.date = new Date().toLocaleDateString();
    this.date = this.invertdata(this.date).trim();
    this.hora = new Date().toLocaleTimeString().substr(0, 5);
    return this.date + "T" + this.hora;
  }

  formataInt(valor:number, casas:number): string{
    let ret="000000000"+valor.toString();
    ret=ret.substring(ret.length-casas);
    return ret;
  }

  corrigedata(data: string): string {
    return data.substr(0, 10) + " " + data.substr(11, 8);
  }

  formata(valor: number) {
    let campo = valor.toString();
    let p = campo.indexOf(".");
    if (p==-1){
       campo=campo+".00";
       p=campo.indexOf(".");
    }
    let dec = campo.substr(p + 1, 2);
    if (dec.length==1)
       dec+="0";
    let int = campo.substr(0, p);
    let j = 0;
    let inteiro = "";
    for (let i = int.length - 1; i >= 0; i--) {
      if (j == 3) {
        inteiro = "." + inteiro;
        j = 0;
      }
      j++;
      inteiro = int.substr(i, 1) + inteiro;
    }
    return inteiro + "," + dec;
  }

  mesano(mes: number, Ano: any) {
    let i = mes - 1;
    return this.meses[i] + " de " + Ano;
  }

  t_entrada(ev) {
    if (ev.target.value=="")
      alert("Em campo de Valor são aceitos os dígito e 1 ponto(.). E ele é obrigatório");
  }

}
