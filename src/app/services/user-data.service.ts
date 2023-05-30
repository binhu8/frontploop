import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserResponse } from '../models/user-response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserDataService   {

  private userUpdate = new BehaviorSubject<UserResponse>(undefined)
  $userUpdate: Observable<UserResponse> = this.userUpdate.asObservable()

  constructor(
    private http: HttpClient
  ) { }

  setUserUpdate(userData){

    localStorage.setItem('user', JSON.stringify(userData))
    this.userUpdate.next(userData)
  }

  getUserById(id: string): Observable<UserResponse>{
    return this.http.get<UserResponse>(`${environment.api}/user/${id}`)
  }

  getUserFollows(seguidores: string[]){
    return this.http.post<UserResponse>(`${environment.api}/user/seguidores`, seguidores)
  }

  setFollow(seguidor, seguindo, user){
    return this.http.put(`${environment.api}/user/seguindo/${seguidor}/${seguindo}`, user)
  }
  setUnfollow(seguindo, user){
    return this.http.put(`${environment.api}/user/unfollow/${seguindo}`, user)
  }

  getUserByEmail(email: string){
    return this.http.get(`${environment.api}/user/email/${email}`)
  }


}
