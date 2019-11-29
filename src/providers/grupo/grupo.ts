import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { FuncoesProvider } from '../funcoes/funcoes';

@Injectable()
export class GrupoProvider {

  constructor(public dbProvider:DatabaseProvider,
              public Funcoes:FuncoesProvider) {}

  public inclui(codigo: any, descricao: string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "insert into grupo ";
        sql += "(Codigo, Descricao) ";
        sql += "VALUES ";
        sql += "(?,?)";
        let data = [codigo, descricao];
        db.executeSql(sql, data)
          .then(() => {
          })
          .catch(e => alert('Erro na Inclusão: ' + e));
      })
      .catch(e => console.error(e));
  }

  public deleta(codigo: any) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "Delete from grupo ";
        sql += "Where Codigo=? ";
        let data = [codigo];
        db.executeSql(sql, data)
          .then(() => {
          })
          .catch(e => alert(e));
      })
      .catch(e => alert(e));
  }

  public altera(codigo: any, descricao: string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "Update grupo set ";
        sql += "Descricao=?";
        sql += "Where Codigo=? ";
        let data = [descricao, codigo];
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
        let sql = 'select * from grupo where Codigo= ?';
        var data: any[] = [codigo];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let grupo = new Grupo();
              grupo.codigo = item.Codigo;
              grupo.descricao = item.Descricao;
              return grupo;
            } else {
              let grupo = new Grupo();
              grupo.codigo = -1;
              return grupo;
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
        let sql = 'select * from grupo';
        let data: any[] = [];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let grupos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var grupo = data.rows.item(i);
                grupos.push(grupo);
              }
              return grupos;
            } else {
              return [];
            }
          })
          .catch((e) => alert('Erro no execute:' + e));
      })
      .catch((e) => alert('Erro na Abertura: ' + e));
  }

}

export class Grupo {
  codigo: number;
  descricao: string;
}
