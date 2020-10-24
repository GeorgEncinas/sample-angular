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
  editPost: number;

  postForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/\w/),
    ]),
    author: new FormControl('', []),
  });

  filterForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  constructor(private postService: PostsService) {
    this.readPosts();
    this.editPost = 0;
    this.filterForm.statusChanges
      .subscribe(() => {
        if (this.filterForm.valid){
          this.onSearch();
        }
      });
  }

  private readPosts(): void {
    this.postService.getPosts().subscribe((response) => {
      this.posts = response;
    });
  }

  onSubmit(): void {
    const payload = this.postForm.getRawValue();
    if (this.postForm.valid) {
      if (this.editPost) {
        const id = this.editPost;
        this.postService.updatePost(id, payload).subscribe((postUpdated) => {
          this.editPost = 0;
          this.readPosts();
          this.postForm.reset();
        });
      } else {
        this.postService.createPost(payload).subscribe((respond) => {
          this.readPosts();
        });
      }
    } else {
      alert('se requiere campos validos');
    }
  }

  onSearch(): void {
    // Pending refactor
    this.postService.getPosts({
      params: {
        q: this.filterForm.value.search
      }
    })
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(id: number): void {
    this.postService.deletePost(id).subscribe(
      (response) => {
        this.readPosts();
        alert('eliminado');
      },
      (error) => {
        if (error.status === 404) {
          alert('no existe el post');
        } else {
          alert('hubo un error al eliminar');
        }
      }
    );
  }

  onEdit(post: Post): void {
    this.postForm.reset(post);
    this.editPost = post.id;
  }
}
