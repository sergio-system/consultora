import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { FuncoesProvider } from '../funcoes/funcoes';

@Injectable()
export class ProdutoProvider {
  constructor(public dbProvider: DatabaseProvider,
              public Funcoes: FuncoesProvider) { }

  public inclui(codigo:any,
                catalogo: any,
                grupo: any,
                descricao: string,
                preco: number) {
    this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
     let sql = "insert into produto ";
     sql += "(Codigo, Catalogo, Grupo, Descricao, Preco) ";
     sql += "VALUES ";
     sql += "(?,?,?,?,?)";
     let data = [codigo, catalogo, grupo, descricao, preco];
     db.executeSql(sql, data)
     .catch(e => alert('Erro na Inclusão do Produto: ' + e));
    })
   .catch(e => console.error(e));
  }

  public deleta(codigo: any) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "Delete from produto ";
        sql += "Where Codigo=? ";
        let data = [codigo];
        db.executeSql(sql, data)
          .then(() => {
          })
          .catch(e => alert(e));
      })
      .catch(e => alert(e));
  }

  public altera(codigo: any,
    catalogo: any,
    grupo: any,
    descricao: string,
    preco: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "Update produto set ";
        sql += "Catalogo=?, ";
        sql += "Grupo=?, "
        sql += "Descricao=?, ";
        sql += "Preco=?  "
        sql += "Where Codigo=? ";
        let data = [catalogo, grupo, descricao,preco, codigo];
        db.executeSql(sql, data)
          .then(() => {
          })
          .catch(e => alert('Erro na Alteração' + e));
      })
      .catch(e => alert(e));
  }

  public le(codigo: any) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from produto where Codigo= ?';
        var data: any[] = [codigo];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let produto= new Produto();
              produto.codigo = item.Codigo;
              produto.catalogo=item.Catalogo;
              produto.grupo=item.Grupo;
              produto.descricao = item.Descricao;
              produto.preco=item.Preco;
              return produto;
            } else {
              let produto = new Produto();
              produto.codigo = -1;
              return produto;
            }
          })
          .catch((e) => alert(e));
      })
      .catch((e) => console.error(e));
  }


  public tem(codigo: any) {
    return this.le(codigo)
      .then((grupo: any) => {
        if (grupo.codigo == -1) {
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
        let sql = 'select * from produto ';
        sql+='order by descricao';
        let data: any[] = [];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let produtos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var produto = data.rows.item(i);
                produtos.push(produto);
              }
              return produtos;
            } else {
              return [];
            }
          })
          .catch((e) => alert('Erro no execute:' + e));
      })
      .catch((e) => alert('Erro na Abertura: ' + e));
  }
}

export class Produto {
  codigo: number;
  catalogo:number;
  grupo:number;
  descricao: string;
  preco:number;
}

