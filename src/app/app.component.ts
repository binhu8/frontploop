import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { UserDataService } from './services/user-data.service';
import { ThemeService } from './services/theme.service';
import { UserResponse } from './models/user-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  userData: UserResponse = undefined
  constructor(
    private config: PrimeNGConfig,
    private translateService: TranslateService,
    private userDataService: UserDataService,
    private themeService: ThemeService
  ){}

  ngOnInit(){
      this.userDataService.$userUpdate.subscribe(res => {
        this.userData = res
      })
      if(!this.userData) {
        let user:any = localStorage.getItem('user')
        user = JSON.parse(user);
        this.userDataService.getUserById(user._id).subscribe(res => {
          this.userDataService.setUserUpdate(res)
        })
      }else{
        console.log(this.userData, 'app component')
        this.userDataService.getUserById(this.userData._id).subscribe(res => {
          this.userDataService.setUserUpdate(res)
        })
      }
      const theme = localStorage.getItem('theme');
      if(theme && theme == 'dark') this.themeService.darkMode(true)
      if(theme && theme == 'light') this.themeService.darkMode(false)
      if(!theme){
        localStorage.setItem('theme', 'light');
        this.themeService.darkMode(false);
      }

      let userData = localStorage.getItem('user');
      if(userData) userData = JSON.parse(userData);
      this.userDataService.setUserUpdate(userData);

      this.config.ripple = true;
      this.translateService.setDefaultLang('pt');
      this.translateService.use('pt');
      this.translateService.get('pt').subscribe(res => {
        this.config.setTranslation(res);
     });
  }
}
