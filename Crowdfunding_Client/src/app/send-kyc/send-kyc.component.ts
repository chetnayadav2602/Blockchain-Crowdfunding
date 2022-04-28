import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-kyc',
  templateUrl: './send-kyc.component.html',
  styleUrls: ['./send-kyc.component.css']
})
export class SendKYCComponent implements OnInit {
  data2: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  
  SubmitDetails(sendKYCForm: any){  
    console.log(sendKYCForm); 
    this.postKYC(sendKYCForm);
     
  } 

  
  public postKYC(sendKYCForm: any){
    console.log('KYC Requested!!');

    const baseURL = 'http://localhost:5000/createKYCRequest'
    const headers = {'content-type':'application/json'};
    const body=JSON.stringify({ fname: sendKYCForm.fname, lname: sendKYCForm.lname, role_applied_for : sendKYCForm.role_applied_for, phone: sendKYCForm.phone, email: sendKYCForm.email});
    const params = new HttpParams().set('fname', sendKYCForm.fname).set('lname',sendKYCForm.lname).set('role_applied_for', sendKYCForm.role_applied_for).set('phone', sendKYCForm.phone).set('email', sendKYCForm.email).set('email', sendKYCForm.email).set('doc_type', 'SSN');
    console.log(params);

    this.http.post(baseURL, body,{'headers': headers, 'params': params}).subscribe(data => {
      this.data2 = data,
        (      error: any) => console.log('Sorry!! ', error)
        
    })
    this.router.navigate(['/app-view-contracts']);
  }

}
