import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + 'users/' + id, user);
  }

  // tslint:disable-next-line: ban-types
  setMainPhoto(userId: number, id: number): Observable<Object> {
    return this.http.post(
      this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain',
      {}
    );
  }

  // tslint:disable-next-line: ban-types
  deletePhoto(userId: number, id: number): Observable<Object> {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }
}
