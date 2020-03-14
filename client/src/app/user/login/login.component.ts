import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { AppService } from "./../../app.service";
//import for toastr
import { ToastrService } from "ngx-toastr";

//for loading spinner

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public email: any;
  public password: any;

  constructor(
    public appService: AppService,
    public router: Router // private toastr: ToastrService
  ) {}

  ngOnInit() {}

  public goToSignUp: any = () => {
    this.router.navigate(["/signup"]);
  }; // end goToSignUp

  public signinFunction: any = () => {
    if (!this.email) {
      // this.toastr.warning('enter email')
    } else if (!this.password) {
      // this.toastr.warning('enter password')
    } else {
      let data = {
        email: this.email,
        password: this.password
      };

      this.appService.signinFunction(data).subscribe(
        apiResponse => {
          console.log(apiResponse);
          if (apiResponse) {
            Cookie.set("authtoken", apiResponse.user.token);
            Cookie.set("userId", apiResponse.user.id);
            Cookie.set(
              "receiverName",
              apiResponse.user.firstname + " " + apiResponse.user.lastname
            );
            this.appService.setUserInfoInLocalStorage(apiResponse.user);

            //   this.router.navigate(['/']);

            setTimeout(() => {
              this.router.navigate(["/home"]);
            }, 1000);
          } else {
            setTimeout(() => {
              // this.toastr.error(apiResponse.message);
            }, 1000);
          }
        },
        err => {
          if (err.status == 404) {
            setTimeout(() => {
              this.router.navigate(["/page-not-found"]);
            }, 1000);
          } else if (err.status == 500) {
            setTimeout(() => {
              this.router.navigate(["/server-error"]);
            }, 1000);
          } else if (err.status == 400) {
            setTimeout(() => {
              // this.toastr.error('Password incorrect')
            });
          } else {
            setTimeout(() => {
              this.router.navigate(["/signup"]);
              // this.toastr.error('Please, create account')
            });
          }
        }
      );
    } // end condition
  }; // end signinFunction

  public doLoginUsingKeypress: any = (event: any) => {
    if (event.keyCode === 13) {
      // 13 is keycode of enter.

      this.signinFunction();
    }
  }; // end sendMessageUsingKeypress
}
