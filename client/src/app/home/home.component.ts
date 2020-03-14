import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { Router } from "@angular/router";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions
} from "@ng-bootstrap/ng-bootstrap";

import { CommentComponent } from "./comment/comment.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  allPosts: any = [
    {
      title: "Twitter post1",
      description:
        "The coronavirus is a huge problem. Ignoring the problem is a non solution. The Indian economy will be destroyed if strong action is not taken. The government is in a stupor."
    },
    {
      title: "Twitter post2",
      description:
        "The coronavirus is a huge problem. Ignoring the problem is a non solution. The Indian economy will be destroyed if strong action is not taken. The government is in a stupor."
    },
    {
      title: "Twitter post3",
      description:
        "The coronavirus is a huge problem. Ignoring the problem is a non solution. The Indian economy will be destroyed if strong action is not taken. The government is in a stupor."
    },
    {
      title: "Twitter post3",
      description:
        "The coronavirus is a huge problem. Ignoring the problem is a non solution. The Indian economy will be destroyed if strong action is not taken. The government is in a stupor."
    },
    {
      title: "Twitter post5",
      description:
        "The coronavirus is a huge problem. Ignoring the problem is a non solution. The Indian economy will be destroyed if strong action is not taken. The government is in a stupor."
    }
  ];
  public likeState: string = "unliked";
  public iconName: string = "heart-empty";
  modalOptions: NgbModalOptions;
  title = "ng-bootstrap-modal-demo";
  closeResult: string;
  currentTweet: string;

  constructor(
    private appService: AppService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop"
    };
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.appService.getAllPosts().subscribe((data: any) => {
      this.allPosts = data.data;
    });
  }

  toggleLikeState() {
    if (this.likeState == "unliked") {
      this.likeState = "liked";
      this.iconName = "heart";
    } else {
      this.likeState = "unliked";
      this.iconName = "heart-empty";
    }
  }

  addPost() {
    let data = {
      title: this.currentTweet,
      description: this.currentTweet,
      userId: Cookie.get("userId")
    };    
    this.appService.addTweet({ post: data }).subscribe(data => {
      this.currentTweet = "";
      this.initData();
      console.log("tweet added");
    });
  }

  addComment(postDetails) {
    const modalRef = this.modalService.open(CommentComponent);
    modalRef.componentInstance.modal_title = "Add Comment";
    modalRef.componentInstance.post = postDetails;
  }

  logout() {
    Cookie.delete("authtoken");
    Cookie.delete("receiverName");
    this.router.navigate(["/login"]);
  }
}
