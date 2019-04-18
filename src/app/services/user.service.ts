import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserList(page): Observable<any> {
    return this.http.get(`https://reqres.in/api/users?page=${page}`);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`https://reqres.in/api/users/${id}`);
  }
}
