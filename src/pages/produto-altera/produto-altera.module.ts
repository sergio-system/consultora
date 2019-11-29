import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoAlteraPage } from './produto-altera';

@NgModule({
  declarations: [
    ProdutoAlteraPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoAlteraPage),
  ],
})
export class ProdutoAlteraPageModule {}
