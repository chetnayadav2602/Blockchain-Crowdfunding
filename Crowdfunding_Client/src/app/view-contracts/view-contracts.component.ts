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
  
  ngOnInit(): void {
    this.getContracts();

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
    })
   
    
  }
  
  temp1 : any;
  public getPendingApprovals(){
    this.http.get("http://localhost:5000/fetchKYCRequests").subscribe(permModel => {this.temp1 = permModel});
  }
  data1;
  public approveRequest(address:any,role_requested: any){
    /*const baseURL = 'http://localhost:5000/approveKYCRequest';
    const headers = {'content-type':'application/json'};
    const body=JSON.stringify({ reqAdd: address, reqRole: role_requested});
    const params = new HttpParams().set('reqAdd', address).set('reqRole',role_requested);
    console.log(address);
    console.log(role_requested);
    this.http.post(baseURL, body,{'headers':headers, 'params': params}).subscribe(data => {
      this.data1 = data;
    alert('Reuest sent for approval!!')
  })*/
    
  }
  data2;
  public rejectRequest(address:any,role_requested: any){
    /*const baseURL = 'http://localhost:5000/rejectKYCRequest';
    const headers = {'content-type':'application/json'};
    const body=JSON.stringify({ reqAdd: address, reqRole: role_requested});
    const params = new HttpParams().set('reqAdd', address).set('reqRole',role_requested);
    console.log(address);
    console.log(role_requested);
    this.http.post(baseURL, body,{'headers':headers, 'params': params}).subscribe(data => {
      this.data2 = data;
    alert('Reuest sent for approval!!')
  })*/
  }

  


  

}
function body(baseURL: string, body: any, arg2: { headers: { 'content-type': string; }; params: HttpParams; }) {
  throw new Error('Function not implemented.');
}

