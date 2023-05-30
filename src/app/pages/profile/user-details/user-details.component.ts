import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/models/user-response';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit{

  @Input("userData") userData: any = undefined;
  @Input("seguidores") seguidores: any[ ] = [];
  @Input('seguindo') seguindo: boolean = false;
  @Input("localUserData") localUserData: any = undefined;
  @Input("id") id: string = '';
  @Output() novoSeguidor = new EventEmitter()
  @Output() unfollows = new EventEmitter()



  constructor(
    private router: Router,
    private userDataService: UserDataService
  ){}

  ngOnInit(): void {

  }

  navigate(id){
    this.router.navigate([`/profile/${id}`]);
    setTimeout(() => {
      location.reload()
    });
  }

  follow(){
    this.localUserData.seguindo.push(this.id);
    this.userData.seguidores.push(this.localUserData._id)
    this.userDataService.setFollow(this.localUserData._id, this.id, this.localUserData).subscribe(res => {
      this.novoSeguidor.emit(this.userData)
    })
  }

  unfollow(){

    this.localUserData.seguindo = this.localUserData.seguindo.filter(id => {
      return id != this.id
    });

    this.userData.seguidores = this.userData.seguidores.filter((seguidor: any) => {
      return seguidor._id == this.localUserData._id
    })

    const users = {
      loggedUser: this.localUserData,
      unfollowUser: this.userData
    }

    this.userDataService.setUnfollow( this.id, users).subscribe(res => {
      this.unfollows.emit(this.userData)
      this.userDataService.setUserUpdate(this.localUserData)
    })
  }
}
