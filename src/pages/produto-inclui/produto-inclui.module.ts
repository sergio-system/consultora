import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoIncluiPage } from './produto-inclui';

@NgModule({
  declarations: [
    ProdutoIncluiPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoIncluiPage),
  ],
})
export class ProdutoIncluiPageModule {}
