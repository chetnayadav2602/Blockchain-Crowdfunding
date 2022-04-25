import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Campaign } from 'src/models/capmaign.model';

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
 
  constructor(private http: HttpClient) {} 

 

}
