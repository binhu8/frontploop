import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/login-credentials';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user-response';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: LoginCredentials): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${environment.api}/login`, credentials)
  }
}
