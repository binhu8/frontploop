import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserResponse } from 'src/app/models/user-response';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  ngAfterViewInit(){

  }

  load = false

  id: string | undefined = undefined;
  userData: UserResponse = undefined;
  seguidores: UserResponse[] = [];
  seguindo: boolean = false;
  localUserData: UserResponse = undefined

  constructor(
    private activatedRoute: ActivatedRoute,
    private userDataService: UserDataService
  ){}

  ngOnInit(): void {
    this.getLocalUserData()
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    if(this.id) this.getUserProfileInfos(this.id)
  }

  getUserProfileInfos(id: string){
    this.userDataService.getUserById(id).subscribe(res => {
      this.userData = res;
      console.log(res)
      this.userDataService.getUserFollows(this.userData.seguidores).subscribe((res:any) => {
        this.seguidores = res;
        this.seguindo = this.localUserData._id != this.id && this.localUserData.seguindo.includes(this.id)
        this.load = true
      })
    })
  }

  getLocalUserData(){
    this.userDataService.$userUpdate.subscribe(res => {
      this.localUserData = res
    })
  }
}
