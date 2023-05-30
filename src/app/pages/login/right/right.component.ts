import { Component, EventEmitter, OnInit, Output, SimpleChange } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorResponse } from 'src/app/models/error-response';
import { UserResponse } from 'src/app/models/user-response';
import { LoginService } from 'src/app/services/login.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit{

  @Output() createdUser = new EventEmitter

  type: string = 'password';
  isOpen: boolean = false;
  error: ErrorResponse = {error: false, message: ""}

  constructor(
    private loginService: LoginService,
    private themeService: ThemeService,
    private messageService: MessageService,
    private userDataService: UserDataService,
    private router: Router
  ){

  }

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });



  ngOnInit(): void {
    this.themeService.darkMode(false)
  }

  login(){
    this.loginService.login(this.form.value).subscribe((res: any ) => {
      if(res.error){
        this.error = res;
        this.form.controls['email'].setErrors({'sincorrect': true});
        this.form.controls['password'].setErrors({'incorrect': true});
      }else{
        this.userDataService.setUserUpdate(res)
        this.router.navigate(['/home'])
      }

    })
  }

  toggleModal():void{
    this.isOpen = !this.isOpen
  }

  toggleDarkMode(mode:any){
    this.themeService.darkMode(mode)
  }

  created(){
    this.isOpen = false;
    this.form.reset()
    this.createdUser.emit();
  }
}
