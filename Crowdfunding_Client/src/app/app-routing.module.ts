import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignFactoryComponent } from './campaign-factory/campaign-factory.component';
import { ViewContractsComponent } from './view-contracts/view-contracts.component';


const routes: Routes = [  { path: 'app-view-contracts', component: ViewContractsComponent },
                          { path: 'app-campaign-factory', component: CampaignFactoryComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
