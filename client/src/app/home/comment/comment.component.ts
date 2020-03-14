import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "../../app.service";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.scss"]
})
export class CommentComponent implements OnInit {
  @Input() modal_title;
  @Input() post;

  comment: string;

  constructor(
    public activeModal: NgbActiveModal,
    private appService: AppService
  ) {}

  ngOnInit() {}

  addComments() {
    this.appService.addComments(this.comment);
    this.activeModal.close();
  }
}
