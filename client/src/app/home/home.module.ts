import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";

// components
import { HomeComponent } from "./home.component";
import { CommentComponent } from "./comment/comment.component";

@NgModule({
  declarations: [HomeComponent, CommentComponent],
  imports: [CommonModule, IonicModule, FormsModule, SharedModule],
  entryComponents: [CommentComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
