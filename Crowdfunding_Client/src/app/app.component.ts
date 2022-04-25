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

  public isUserLoggedIn : boolean =false;
  
  public login(){
    console.log("Login start",this.isUserLoggedIn);
    this.logInService.login();
    this.isUserLoggedIn = this.logInService.isLoggedIn;
    console.log(this.isUserLoggedIn);
    console.log("Login successful");
    this.router.navigate(['/app-view-contracts']);
  }

}
