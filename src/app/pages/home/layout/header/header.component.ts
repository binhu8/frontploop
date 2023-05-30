import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserResponse } from 'src/app/models/user-response';
import { ThemeService } from 'src/app/services/theme.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit{
  userData!: UserResponse;
  items: MenuItem[];
  theme: string = 'light'
  valueSearch: string = ''

  constructor(
    private userDataService: UserDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService
  ){}

  ngOnInit(): void {
    this.themeService.$getTheme.subscribe(res => {
      this.theme = res
    })
    this.userDataService.$userUpdate.subscribe(res => {
      this.userData = res
    })
    this.items = [{
      label: 'Configurações',
      items: [
        {label: 'Meu perfil', icon: 'pi pi-user', command: ()=> {
          this.router.navigate([`profile/${this.userData._id}`]);
          setTimeout(() => {
            location.reload()
          });
        }},
        {label: 'Sair', icon: 'pi pi-sign-out',command: ()=>{
          localStorage.clear();
          location.reload()
        }}
      ]
    }]
  }

  getUserDataInLocalStorage(): void{
    const userData = localStorage.getItem('user');
    this.userData = JSON.parse(userData)
    console.log(this.userData)
  }

  search(){
    this.userDataService.getUserByEmail(this.valueSearch).subscribe((res: any) => {
      if(res){
        this.router.navigate([`/profile/${res._id}`])
        setTimeout(() => {
          location.reload()
        });
      }
    })
  }

}
