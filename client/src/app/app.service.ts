import { Injectable } from "@angular/core";

//for using cookies
import { Cookie } from "ng2-cookies/ng2-cookies";

//Importing the required files for http services.
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
//import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AppService {
  private url = "http://localhost:3000";

  private baseURL = `${this.url}/api`;
  public listId: String;
  public deleteItem: String;
  public deleteSubItem: String;

  constructor(public http: HttpClient) {} //end of constructor

  // public getUserInfoFromLocalstorage = () => {

  //   return JSON.parse(localStorage.getItem('userInfo'));

  // } // end getUserInfoFromLocalstorage

  public setUserInfoInLocalStorage = data => {
    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  public signinFunction(data): Observable<any> {
    const params = new HttpParams()
      .set("email", data.email)
      .set("password", data.password);

    return this.http.post(`${this.url}/api/users/login`, { user: data });
  } // end of signinFunction function.

  // //Method to get country list
  public getCountryList() {
    let response = this.http.get("../assets/countries.json");
    return response;
  } //end

  // //method to get country code
  public getCountryCode = () => {
    let response = this.http.get("../assets/country-code-list.json");
    return response;
  }; //end

  public signupFunction(data): Observable<any> {
    return this.http.post(`${this.url}/api/users`, { user: data });
  } // end of signupFunction function.

  public sendResetLink(email): Observable<any> {
    // console.log(this.url+"/api/v1/users/forgotPassword");
    const params = new HttpParams().set("email", email);
    return this.http.post(`${this.url}/api/v1/users/forgotPassword`, params);
  }

  //Get All Posts:
  getAllPosts() {
    return this.http.get(`http://localhost:3000/api/post/getAllPost`);
  }

  addComments(data) {
    // return this.http.post(`${this.baseURL}/lists/${listId}/delete?authToken=${token}`,listId);
  }

  addTweet(data) {
    return this.http.post(`http://localhost:3000/api/post/addPost`, data);
  }

  
}
