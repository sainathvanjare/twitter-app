import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./user/login/login.component";
import { SignupComponent } from "./user/signup/signup.component";
import { ForgotPasswordComponent } from "./user/forgot-password/forgot-password.component";
import { HomeComponent } from "./home/home.component";

import { RouteGuardService } from "./route-guard.service";

const routes: Routes = [
  { path: "login", component: LoginComponent, pathMatch: "full" },
  // { path: 'page-not-found', component: PageNotFoundComponent },
  // { path: 'server-error', component: ServerErrorComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  // { path: '*', component: LoginComponent },
  // { path: '**', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'forgot-password', component: ForgotPasswordComponent }
  { path: "home", component: HomeComponent, canActivate: [RouteGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
