import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  constructor() { }

  public isLoggedIn: boolean=false;

  public login() {
    this.isLoggedIn=true;
  }

}