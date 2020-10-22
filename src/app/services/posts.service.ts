import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/posts.model';

const url = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${url}/posts`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${url}/posts`, post);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${url}/posts/${id}`);
  }
}
