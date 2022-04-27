import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Campaign } from 'src/models/capmaign.model';
import { LoggedInUserService } from './services/logged-in-user.service';
import { Router } from '@angular/router';

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

  public async login(){

    //@ts-ignore
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(account);
    window.location.replace("/app-view-contracts");
    
  }

}
