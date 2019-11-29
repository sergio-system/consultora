import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { FuncoesProvider } from '../funcoes/funcoes';

@Injectable()
export class ClienteProvider {
  constructor(public dbProvider: DatabaseProvider,
    public Funcoes: FuncoesProvider) { }

  public inclui(telefone: string,
    nome: string,
    endereco: string,
    bairro: string,
    cidade: string,
    uf: string,
    sexo: string,
    diaaniversario: number,
    mesaniversario: number) {
    if (this.tem(telefone)){
      this.Funcoes.alerta("Inclusão de Cliente","Telefone do Cliente já cadastrado");
      return;
    }  
    this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "insert into cliente ";
        sql += "(Telefone, Nome, Endereco, Bairro, Cidade, Uf, Sexo, DiaAniversario, MesAniversario) ";
        sql += "VALUES ";
        sql += "(?,?,?,?,?,?,?,?,?)";
        let data = [telefone, nome, endereco, bairro, cidade, uf, sexo, diaaniversario, mesaniversario];
        db.executeSql(sql, data)
          .catch(e => alert('Erro na Inclusão do Produto: ' + e));
      })
      .catch(e => console.error(e));
  }

  public deleta(telefone: string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "Delete from cliente ";
        sql += "Where telefone=? ";
        let data = [telefone];
        db.executeSql(sql, data)
          .then(() => {
          })
          .catch(e => alert(e));
      })
      .catch(e => alert(e));
  }

  public altera(telefone: string,
    nome: string,
    endereco: string,
    bairro: string,
    cidade: string,
    uf: string,
    sexo: string,
    diaaniversario: number,
    mesaniversario: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "Update cliente set ";
        sql += "Nome=?, ";
        sql += "Endereco=?, ";
        sql += "Bairro=?, ";
        sql += "Cidade=?, ";
        sql += "Uf=?, ";
        sql += "Sexo=?, ";
        sql += "DiaAniversario=?, ";
        sql += "MesAniversario=? ";
        sql += "Where Telefone=? ";
        let data = [nome, endereco, bairro, cidade, uf, sexo, diaaniversario, mesaniversario, telefone];
        db.executeSql(sql, data)
          .then(() => {
          })
          .catch(e => alert('Erro na Alteração' + e));
      })
      .catch(e => alert(e));
  }

  public le(telefone: string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from cliente where telefone= ?';
        var data: any[] = [telefone];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let cliente = new Cliente();
              cliente.telefone = item.Telefone;
              cliente.nome = item.Nome;
              cliente.endereco = item.Endereco;
              cliente.bairro = item.Bairro;
              cliente.cidade = item.Cidade;
              cliente.uf = item.Uf;
              cliente.sexo = item.Sexo;
              cliente.diaaniversario = item.DiaAniversario;
              cliente.mesaniversario = item.Mes;
              return cliente;
            } else {
              let cliente = new Cliente();
              cliente.telefone = "-1";
              return cliente;
            }
          })
          .catch((e) => alert(e));
      })
      .catch((e) => console.error(e));
  }


  public tem(telefone:string) {
    return this.le(telefone)
      .then((cliente: any) => {
        if (cliente.telefone == "-1") {
          return false;
        }
        else {
          return true;
        }
      })
      .catch((e) => alert("Erro no tem: " + e));
  }

  public listar() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from cliente ';
        sql += 'order by nome';
        let data: any[] = [];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let clientes: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var cliente = data.rows.item(i);
                clientes.push(cliente);
              }
              return clientes;
            } else {
              return [];
            }
          })
          .catch((e) => alert('Erro no execute:' + e));
      })
      .catch((e) => alert('Erro na Abertura: ' + e));
  }
}

export class Cliente {
  telefone: string;
  nome: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  sexo: string;
  diaaniversario: number;
  mesaniversario: number;
}

