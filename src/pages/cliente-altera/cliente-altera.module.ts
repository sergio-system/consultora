import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteAlteraPage } from './cliente-altera';

@NgModule({
  declarations: [
    ClienteAlteraPage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteAlteraPage),
  ],
})
export class ClienteAlteraPageModule {}
