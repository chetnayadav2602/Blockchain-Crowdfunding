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
  //data2;
  ngOnInit(): void {
    this.getContracts();
  }

  
  
  //title = 'my-crowdfunding';
  temp : any;
  temp2: any;

  public model : any;
  //title = 'my-crowdfunding';

  public getContracts(){
    this.http.get("http://localhost:5000/getCampaings").subscribe(model => this.temp = model);
  }
  
  //public getContracts(){

    
    // this.http.get("http://localhost:5000/getCampaings").subscribe((response:any) => {
    //   this.temp=(response)
    //   console.log ("hello"+this.temp);
    //   for (let element of this.temp) {
        
    //     const baseURL = 'http://localhost:5000/getCampaignSummary'
    //     const headers = {'content-type':'application/json'};
    //     const params = new HttpParams().set('campaingId',element)
    //     console.log(params);
    //     this.http.post(baseURL, body,{'headers':headers, 'params': params}).subscribe(data => {
    //       this.data2 = data;
    //       alert('Campaign Posted!!')
    //   })
    //       // console.log(element);
    //       // this.http.get("http://localhost:5000/getCampaignSummary",element).subscribe((response:any) => {this.temp2=(response)});
    //       // console.log("after");
        
    //}
    
    
  //   });
  //   console.log("end of function");
    
  // }

  //public permModel : any;
  //title = 'my-crowdfunding';
  temp1 : any;
  public getPendingApprovals(){
    //this.http.get("http://localhost:5000/getCampaings").subscribe(permModel => this.temp1 = permModel);
    this.temp1=['PERM1','PERM2'];
    
  }

  


  

}
function body(baseURL: string, body: any, arg2: { headers: { 'content-type': string; }; params: HttpParams; }) {
  throw new Error('Function not implemented.');
}

