import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalogoAlteraPage } from './catalogo-altera';

@NgModule({
  declarations: [
    CatalogoAlteraPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalogoAlteraPage),
  ],
})
export class CatalogoAlteraPageModule {}
