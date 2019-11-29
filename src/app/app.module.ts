import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CatalogoPage } from '../pages/catalogo/catalogo';
import { GrupoPage } from '../pages/grupo/grupo';
import { VendaPage } from '../pages/venda/venda';
import { ProdutoPage } from '../pages/produto/produto';
import { ClientePage } from '../pages/cliente/cliente';
import {SQLite} from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { CatalogoProvider } from '../providers/catalogo/catalogo';
import { FuncoesProvider } from '../providers/funcoes/funcoes';
import { CatalogoIncluiPage } from '../pages/catalogo-inclui/catalogo-inclui';
import { CatalogoAlteraPage } from '../pages/catalogo-altera/catalogo-altera';
import { GrupoProvider } from '../providers/grupo/grupo';
import { GrupoIncluiPage } from '../pages/grupo-inclui/grupo-inclui';
import { GrupoAlteraPage } from '../pages/grupo-altera/grupo-altera';
import { ProdutoProvider } from '../providers/produto/produto';
import { ControleProvider } from '../providers/controle/controle';
import { ProdutoIncluiPage } from '../pages/produto-inclui/produto-inclui';
import { ProdutoAlteraPage } from '../pages/produto-altera/produto-altera';
import { ClienteProvider } from '../providers/cliente/cliente';
import { ClienteIncluiPage } from '../pages/cliente-inclui/cliente-inclui';
import { ClienteAlteraPage } from '../pages/cliente-altera/cliente-altera';

@NgModule({
  declarations: [
    MyApp,
    CatalogoPage,
    CatalogoIncluiPage,
    CatalogoAlteraPage,
    GrupoPage,
    GrupoIncluiPage,
    GrupoAlteraPage,
    VendaPage,
    ProdutoPage,
    ProdutoIncluiPage,
    ProdutoAlteraPage,
    ClientePage,
    ClienteIncluiPage,
    ClienteAlteraPage
    ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CatalogoPage,
    CatalogoIncluiPage,
    CatalogoAlteraPage,
    GrupoPage,
    GrupoIncluiPage,
    GrupoAlteraPage,
    VendaPage,
    ProdutoPage,
    ProdutoIncluiPage,
    ProdutoAlteraPage,
    ClientePage,
    ClienteIncluiPage,
    ClienteAlteraPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    CatalogoProvider,
    FuncoesProvider,
    GrupoProvider,
    ProdutoProvider,
    ControleProvider,
    ClienteProvider
  ]
})
export class AppModule {}
