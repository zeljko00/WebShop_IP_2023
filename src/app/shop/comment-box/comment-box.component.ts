import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/model/Comment';
import { environment } from 'src/app/config/environments';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css'],
})
export class CommentBoxComponent implements OnInit {
  @Input() comment: Comment = new Comment();
  avatar: string = 'bla bla';

  ngOnInit(): void {
    console.log(this.comment);
    if (this.comment.creatorAvatar && this.comment.creatorAvatar !== '')
      this.avatar =
        environment.baseURL +
        environment.avatarsPath +
        '/' +
        this.comment.creatorAvatar;
    else this.avatar = '../../../assets/imgs/no-profile-img.png';
  }
}
