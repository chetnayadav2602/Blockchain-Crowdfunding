import { Component } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http'; 
import { Campaign } from 'src/models/capmaign.model';
import { LoggedInUserService } from './services/logged-in-user.service';
import { Router } from '@angular/router';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
 
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Access-Control-Allow-Methods':'*',
      'Access-Control-Allow-Headers':'*'
    }),
  };
  
  constructor(private http: HttpClient, private logInService: LoggedInUserService, private router: Router ) {} 
  
  roles:any[] =[];
  public async login(){

    //@ts-ignore
    
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(account);
    localStorage.setItem('user_address', accounts[0]);
    
    const headers = {'content-type':'application/json'};
   
    //const params = new HttpParams().set('user_address', '0x9783e40Da023d622d15a4E840b6f679f92390e17');
    // const params = new HttpParams().set('user_address', account);
    console.log("Calling login");
    this.http.get("http://localhost:5000/getRolesOfUser?user_address="+account).subscribe(permModel => {
        for(const i in permModel){
          console.log(permModel[i]);
          this.roles.push(permModel[i]);
        }
        localStorage.setItem('roles', JSON.stringify(this.roles));
        window.location.replace("/app-view-contracts");
      });
         
  }


}
