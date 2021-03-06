import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampaignFactoryComponent } from './campaign-factory/campaign-factory.component';
import { ViewContractsComponent } from './view-contracts/view-contracts.component';
import { FormsModule } from '@angular/forms';
import { SendKYCComponent } from './send-kyc/send-kyc.component';
import { GetApprovalsComponent } from './get-approvals/get-approvals.component';

@NgModule({
  declarations: [
    AppComponent,
    CampaignFactoryComponent,
    ViewContractsComponent,
    SendKYCComponent,
    GetApprovalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
