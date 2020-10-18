import { Component } from '@angular/core';
import { PostsService } from './services/posts.service';
import { Post } from './interfaces/posts.model';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AngularProject';
  posts: Post[];

  postForm: FormGroup = new FormGroup({
    title: new FormControl('', []),
    author: new FormControl('', []),
  });

  constructor(private postService: PostsService) {
    this.readPosts();
  }

  private readPosts(): void {
    this.postService.getPosts().subscribe((response) => {
      this.posts = response;
    });
  }

  onSubmit(): void {
    const payload = this.postForm.getRawValue();
    this.postService.createPost(payload)
      .subscribe(respond => {
        this.readPosts();
      });
  }
}
