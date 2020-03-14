import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidenavbarComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, FooterComponent, SidenavbarComponent]
})
export class SharedModule { }
