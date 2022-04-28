import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { Campaign } from 'src/models/capmaign.model';
import { CampaignSummary } from '../models/campaign-summary.model';
import { CampaignAddress } from '../models/campaign-address.model';


@Component({
  selector: 'app-view-contracts',
  templateUrl: './view-contracts.component.html',
  styleUrls: ['./view-contracts.component.css']
})
export class ViewContractsComponent implements OnInit {

  constructor(private http: HttpClient/*,private httpParams : HttpParams*/) { }
  public campaignDet : CampaignSummary[] = [];
  public campaignAdd : CampaignAddress[] = [];
  roles:any;
  hasRole_fundApprover: boolean = false;
  hasRole_fundRaiser: boolean = false;
  hasRole_fundContributor: boolean = false;

  ngOnInit(): void {
    this.getContracts();
    
    this.roles =  JSON.parse((localStorage.getItem("roles")) || "");
    console.log(this.roles);

    this.hasRole_fundApprover = this.roles.includes('fund_approver');
    this.hasRole_fundRaiser = this.roles.includes('fund_raiser');
    this.hasRole_fundContributor = this.roles.includes('fund_contributor');
    //console.log(this.hasRole);
    setTimeout(() => { 

      //@ts-ignore
      const eth = ethereum;

      if (eth.isConnected() == true && eth.selectedAddress != null) {

          const account = eth.selectedAddress;
          const showAccount = document.querySelector('.showAccount');
          showAccount!.innerHTML = "Account: " + account


          } else {

          window.location.replace("./");

          }
  
      }, 500);


  
  }

  
  
  //title = 'my-crowdfunding';
  temp : any;
  temp2: any;

  public model : any;
  //title = 'my-crowdfunding';

  public getContracts(){
    this.http.get("http://localhost:5000/getDeployedCampaignsDetails").subscribe(model => {
      this.temp=model;
      console.log("Helloooo");
      console.log(this.temp[0].min_contribution);
    });
   
    
  }

  temp3: any;
  public contribute(contributeForm: any){
    console.log('Sending Contribution!!');
    
    const baseURL = 'http://localhost:5000/contribute'
    const headers = {'content-type':'application/json'};
    const user_address = localStorage.getItem('user_address') || "";
    const body=JSON.stringify({ caddr: this.temp3, amount: contributeForm.amount});
    const params = new HttpParams().set('caddr', contributeForm.campaign_address).set('amount',contributeForm.amount).set('user_address', user_address);
    console.log(params);

    this.http.post(baseURL, body,{'headers': headers, 'params': params}).subscribe(data => {
      this.temp3 = data,
        (      error: any) => console.log('Sorry!! ', error)
    })
  }
  

}
function body(baseURL: string, body: any, arg2: { headers: { 'content-type': string; }; params: HttpParams; }) {
  throw new Error('Function not implemented.');
}

