import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/models/user-response';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-left-container',
  templateUrl: './left-container.component.html',
  styleUrls: ['./left-container.component.scss']
})
export class LeftContainerComponent implements OnInit {

  userData: UserResponse = undefined;

  constructor(
    private userDataService: UserDataService
  ){}

  ngOnInit(): void {
    this.userDataService.$userUpdate.subscribe(res => {
      this.userData = res
    })
  }

}
