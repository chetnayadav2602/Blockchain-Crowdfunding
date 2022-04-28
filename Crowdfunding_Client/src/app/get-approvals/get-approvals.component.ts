import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 

@Component({
  selector: 'app-get-approvals',
  templateUrl: './get-approvals.component.html',
  styleUrls: ['./get-approvals.component.css']
})
export class GetApprovalsComponent implements OnInit {

  constructor(private http: HttpClient/*,private httpParams : HttpParams*/) { }
  displayMsg: boolean = false;
  ngOnInit(): void {
    this.getPendingApprovals();
  
    
}

temp1 : any;
public getPendingApprovals(){
  this.http.get("http://localhost:5000/fetchKYCRequests").subscribe(permModel => {this.temp1 = permModel;
  if(typeof this.temp1 == 'undefined' || this.temp1.length == 0){
    this.displayMsg = true;
}});
  
}


data1;
public approveRequest(address:any,role_requested: any){
  const baseURL = 'http://localhost:5000/approveKYCRequest';
  const headers = {'content-type':'application/json'};
  const body=JSON.stringify({ user_address : address, role_applied_for : role_requested});
  const params = new HttpParams().set('user_address', address).set('role_applied_for',role_requested);
  console.log(address);
  console.log(role_requested);
  this.http.post(baseURL, body,{'headers':headers, 'params': params}).subscribe(data => {
    this.data1 = data;
  alert('Request approved!!');
  this.ngOnInit();
})

  
}
data2;
public rejectRequest(address:any,role_requested: any){
  const baseURL = 'http://localhost:5000/rejectKYCRequest';
  const headers = {'content-type':'application/json'};
  const body=JSON.stringify({ user_address: address, role_applied_for: role_requested});
  const params = new HttpParams().set('user_address', address).set('role_applied_for',role_requested);
  console.log(address);
  console.log(role_requested);
  this.http.post(baseURL, body,{'headers':headers, 'params': params}).subscribe(data => {
    this.data2 = data;
  alert('Request rejected!!');
  this.ngOnInit();
})
}}

function body(baseURL: string, body: any, arg2: { headers: { 'content-type': string; }; params: HttpParams; }) {
  throw new Error('Function not implemented.');
}