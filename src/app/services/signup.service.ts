import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto, UserResponse } from '../models/user-response';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient
  ) { }

  setUser(user: UserDto): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${environment.api}/user`, user)
  }
}
