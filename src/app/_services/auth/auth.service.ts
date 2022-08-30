import { User } from './../../_models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, RouterOutlet } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.onInit();
    let user = localStorage?.getItem('currentUser');
    if (user) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(user));
    } else {
      this.currentUserSubject = new BehaviorSubject<User>({} as User);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  onInit() {
  }

  login(userName: string, password: string, role: string) {
    return this.http.post<any>(`/users/authenticate`, { userName, password, role })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage?.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }
      }));
  }

  logout() {
    localStorage?.removeItem('currentUser');
    this.currentUserSubject.next({} as User);
  }
}
