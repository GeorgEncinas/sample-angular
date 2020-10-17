import { Component } from '@angular/core';
import { PostsService } from './services/posts.service';
import { Post } from './interfaces/posts.model'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularProject';
  posts: Post[];

  constructor(private postService: PostsService) {
    this.postService.getPosts()
      .subscribe(response => {
        this.posts = response;
      });
  }
}
