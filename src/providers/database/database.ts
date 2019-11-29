import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private sqlite:SQLite) {}

  public getDB(){
    return this.sqlite.create({
      name:'consultora',
      location:'default'
    })
  }

  public createrdatabase(){
    return this.getDB()
           .then((db:SQLiteObject)=>{
                  this.createTable(db); 
                  })
           .catch(e=>console.error(e));
  }

  public createTable(db:SQLiteObject){
    return db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS catalogo (Codigo integer primary key NOT NULL, Descricao VARCHAR(100))'],
      ['CREATE TABLE IF NOT EXISTS grupo (Codigo integer primary key NOT NULL, Descricao VARCHAR(100))'],
      ['CREATE TABLE IF NOT EXISTS produto (Codigo integer primary key NOT NULL, Catalogo integer, Grupo integer, Descricao VARCHAR(100), Preco real)'],
      ['CREATE INDEX IF NOT EXISTS Descricao on Produto(Descricao)'],
      ['CREATE TABLE IF NOT EXISTS controle (Arquivo VARCHAR(30) primary key NOT NULL, Numero integer)'],
      ['CREATE TABLE IF NOT EXISTS cliente (Telefone VARCHAR(14) primary key NOT NULL, Nome VARCHAR(100), Endereco VARCHAR(100), Bairro VARCHAR(50), Cidade VARCHAR(50), Uf VARCHAR(2), Sexo VARCHAR(1), DiaAniversario integer, MesAniversario integer)'],
      ['CREATE INDEX IF NOT EXISTS Nome on Cliente(Nome)'],
      ['CREATE INDEX IF NOT EXISTS Aniversario on Cliente(MesAniversario, DiaAniversario)']
    ])
    .then(()=>{
    })
    .catch(e=>alert(e));    
  }

}
