import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Campaign } from 'src/models/capmaign.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'my-crowdfunding';
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Access-Control-Allow-Methods':'*',
      'Access-Control-Allow-Headers':'*'
    }),
  };
  public model = new Campaign("");
  constructor(private http: HttpClient) {} 

  public hello(){
    this.http.get<Campaign>("http://localhost:5000/hello").subscribe(model => this.title = model.name);
  }

}
