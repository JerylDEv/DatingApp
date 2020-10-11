import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { Message } from '../_models/message';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(
    page?,
    itemsPerPage?,
    userParams?,
    likesParam?
  ): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pagesize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    if (likesParam === 'Likers') {
      params = params.append('likers', 'true');
    }

    if (likesParam === 'Likees') {
      params = params.append('likees', 'true');
    }

    return this.http
      .get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
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

  // tslint:disable-next-line: ban-types
  sendLike(id: number, recipientId: number): Observable<Object> {
    return this.http.post(
      this.baseUrl + 'users/' + id + '/like/' + recipientId,
      {}
    );
  }

  getMessages(
    id: number,
    page?,
    itemsPerPage?,
    messageContainer?
  ): Observable<PaginatedResult<Message[]>> {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<
      Message[]
    >();

    let params = new HttpParams();

    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pagesize', itemsPerPage);
    }

    return this.http
      .get<Message[]>(this.baseUrl + 'users/' + id + '/messages', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }

          return paginatedResult;
        })
      );
  }

  getMessageThread(id: number, recipientId: number): Observable<Message[]> {
    return this.http.get<Message[]>(
      this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId
    );
  }

  // tslint:disable-next-line: ban-types
  sendMessage(id: number, message: Message): Observable<Object> {
    return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
  }

  // tslint:disable-next-line: ban-types
  deleteMessage(id: number, userId: number): Observable<Object> {
    return this.http.post(
      this.baseUrl + 'users/' + userId + '/messages/' + id,
      {}
    );
  }

  markAsRead(userId: number, messageId: number): void {
    this.http
      .post(
        this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read',
        {}
      )
      .subscribe();
  }
}
