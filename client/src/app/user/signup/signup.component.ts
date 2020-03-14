import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { AppService } from "./../../app.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { SortCountriesPipe } from "../../sort-countries.pipe";

//import for toastr
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
  providers: [{ provide: ToastrService }]
})
export class SignupComponent implements OnInit {
  public countryList: any;
  public finalCountryList: any = [];
  public codeList: any = [];
  public code: any;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public appService: AppService,
    public router: Router,
    private toastr: ToastrService,
    public sortCountries: SortCountriesPipe
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: this.MustMatch("password", "confirmPassword")
      }
    );
    this.appService.getCountryList().subscribe(Response => {
      this.countryList = Response;
      for (var prop in this.countryList) {
        this.finalCountryList.push({
          key: prop,
          value: this.countryList[prop]
        });
      }
      // this.finalCountryList=this.sortCountries.transform(this.finalCountryList);
    });
  }

  get f() {
    return this.registerForm.controls;
  }
  public goToSignIn: any = () => {
    this.router.navigate(["/login"]);
  }; // end goToSignIn

  public signupFunction: any = data => {
    this.appService.signupFunction(data).subscribe(apiResponse => {
      console.log(apiResponse);

      if (apiResponse) {
        // this.toastr.success("Account Created");
        
        setTimeout(() => {
          this.goToSignIn();
        }, 200);
      } else if (apiResponse.status == 404) {
        setTimeout(() => {
          this.router.navigate(["/page-not-found"]);
        }, 1000);
      } else if (apiResponse.status == 500) {
        setTimeout(() => {
          this.router.navigate(["/server-error"]);
        }, 1000);
      } else {
        this.toastr.error(apiResponse.message, "error occured");
      }
    });
  }; // end signupFunction

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.signupFunction(this.registerForm.value);
    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value));
  }
  public onChange = () => {
    this.appService.getCountryCode().subscribe(Response => {
      this.codeList = Response;

      // this.code = this.codeList[this.countryName];
    });
  }; //end

  MustMatch(controlName, matchingControlName) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
