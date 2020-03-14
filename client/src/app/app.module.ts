import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IonicModule } from "@ionic/angular";

import { AppRoutingModule } from "./app-routing.module";
import { UserModule } from "./user/user.module";
import { HttpClientModule } from "@angular/common/http";
import { HomeModule } from "./home/home.module";
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";

import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app.component";
import { SignupComponent } from "./user/signup/signup.component";
import { from } from "rxjs";

import { SortCountriesPipe } from "./sort-countries.pipe";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    HttpClientModule,
    HomeModule,
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot()
  ],
  providers: [SortCountriesPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
