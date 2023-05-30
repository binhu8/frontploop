import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/models/user-response';
import { PublicationService } from 'src/app/services/publication.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-right-container',
  templateUrl: './right-container.component.html',
  styleUrls: ['./right-container.component.scss']
})
export class RightContainerComponent implements OnInit {

  userData: UserResponse = undefined

  constructor(
    private publicationService: PublicationService,
    private userDataService: UserDataService
  ){}

  ngOnInit(): void {

   this.userDataService.$userUpdate.subscribe(res => {
      this.userData = res
    })

    this.publicationService.getMostLIkedPublication(this.userData.seguindo).subscribe(res => {
      console.log(res)
    })
  }
}
