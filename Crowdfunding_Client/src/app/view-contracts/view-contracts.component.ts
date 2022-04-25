import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Campaign } from 'src/models/capmaign.model';

@Component({
  selector: 'app-view-contracts',
  templateUrl: './view-contracts.component.html',
  styleUrls: ['./view-contracts.component.css']
})
export class ViewContractsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getContracts();
  }

  
  public model : any;
  //title = 'my-crowdfunding';
  temp : any
  public getContracts(){
    this.http.get("http://localhost:5000/getCampaings").subscribe(model => this.temp = model);
  }

  //public permModel : any;
  //title = 'my-crowdfunding';
  temp1 : any;
  public getPendingApprovals(){
    //this.http.get("http://localhost:5000/getCampaings").subscribe(permModel => this.temp1 = permModel);
    this.temp1=['PERM1','PERM2'];
    
  }


  

}