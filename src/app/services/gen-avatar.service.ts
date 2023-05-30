import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenAvatarService {

  constructor(
    private http: HttpClient
  ) { }

  getAvatar(){
    return this.http.get('https://api.multiavatar.com/'+'random', {responseType: 'text'})
  }
}
