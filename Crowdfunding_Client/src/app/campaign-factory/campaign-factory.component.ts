import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-campaign-factory',
  templateUrl: './campaign-factory.component.html',
  styleUrls: ['./campaign-factory.component.css']
})
export class CampaignFactoryComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }
  SubmitDetails(postCampForm){  
    console.log(postCampForm); 
    this.postContracts(postCampForm);
     
  } 

  
  public postContracts(postCampForm){
    this.http.post("http://localhost:5000/postCampaings",postCampForm);
  }


}
