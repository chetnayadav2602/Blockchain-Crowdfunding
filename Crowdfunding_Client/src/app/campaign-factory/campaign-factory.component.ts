import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-campaign-factory',
  templateUrl: './campaign-factory.component.html',
  styleUrls: ['./campaign-factory.component.css']
})
export class CampaignFactoryComponent implements OnInit {

  constructor(private http: HttpClient) { }
  data2;
  ngOnInit(): void {
    
    
  }

  SubmitDetails(postCampForm: any){  
    console.log(postCampForm); 
    this.postContracts(postCampForm);
     
  } 

  
  public postContracts(postCampForm: any){
    
    const baseURL = 'http://localhost:5000/postCampaigns'
    const headers = {'content-type':'application/json'};
    const user_address = localStorage.getItem('user_address') || "";
    const body=JSON.stringify({ cname: postCampForm.cname, cdesc: postCampForm.cdesc, cimage : postCampForm.cimage });
    const params = new HttpParams().set('cname', postCampForm.cname).set('cdesc',postCampForm.cdesc).set('cimage', postCampForm.cimage).set('goal', postCampForm.goal).set('min_contribution', postCampForm.min_contribution).set('user_address', user_address);
    console.log(params);
    this.http.post(baseURL, body,{'headers':headers, 'params': params}).subscribe(data => {
      this.data2 = data;
      alert(data['message']);
    })
  }


}
