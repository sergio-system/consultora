import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { FuncoesProvider } from '../funcoes/funcoes';

@Injectable()
export class ControleProvider {
  numero:number;
  constructor(public dbProvider:DatabaseProvider,
              public Funcoes:FuncoesProvider) {}

  public async pegaInicial(Arquivo: string) {
    this.numero=1;
    await this.dbProvider.getDB()
      .then(async (db: SQLiteObject) => {
        let sql = 'select * from controle where Arquivo= ?';
        var data: any[] = [Arquivo];
        await db.executeSql(sql, data)
          .then(async (data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              this.numero = item.Numero;
              sql='Update controle set Numero=? where Arquivo=?'
              data=[this.numero+1,Arquivo];
              await db.executeSql(sql,data)
              .catch((e)=>alert(e));
            } else {
              sql='Insert into controle ';
              sql+='(Arquivo, Numero) ';
              sql+='VALUES';
              sql+='(?,?)';
              data=[Arquivo,2];
              await db.executeSql(sql,data)
              .catch((e)=>alert(e));
            }
          })
          .catch((e) => alert(e));
      })
      .catch((e) => console.error(e));
    return this.numero;
 }

}
