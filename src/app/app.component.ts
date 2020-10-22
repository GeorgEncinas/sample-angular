import { Component } from '@angular/core';
import { PostsService } from './services/posts.service';
import { Post } from './interfaces/posts.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AngularProject';
  posts: Post[];

  postForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/\w/)
    ]),
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
    if (this.postForm.valid) {
      this.postService.createPost(payload)
        .subscribe(respond => {
          this.readPosts();
        });
    } else {
      alert('se requiere campos validos');
    }
  }
  onDelete(id: number): void {
    this.postService.deletePost(id)
      .subscribe(response => {
        this.readPosts();
        alert('eliminado');
      },
      error => {
        if (error.status === 404 ){
          alert('no existe el post')
        } else {
          alert('hubo un error al eliminar')
        }
      });
  }
}
