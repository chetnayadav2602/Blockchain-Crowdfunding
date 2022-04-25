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
    
    const baseURL = 'http://localhost:5000/postCampaings'
    const headers = {'content-type':'application/json'};
    const body=JSON.stringify({ cname: postCampForm.cname, cdesc: postCampForm.cdesc, cimage : postCampForm.cimage });
    const params = new HttpParams().set('cname', postCampForm.cname).set('cdesc',postCampForm.cdesc).set('cimage', postCampForm.cimage);
    console.log(params);
    this.http.post(baseURL, body,{'headers':headers, 'params': params}).subscribe(data => {
      this.data2 = data;
      alert('Campaign Posted!!')
    })
  }


}
