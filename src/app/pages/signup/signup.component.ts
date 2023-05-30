import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { GenAvatarService } from 'src/app/services/gen-avatar.service';
import  multiavatar from '@multiavatar/multiavatar';
import { FormControl, FormGroup } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @Output() created = new EventEmitter()

  avatars: string[] = [];
  indexAvatarSelected: number | undefined = undefined;
  error : any = {}

  form: FormGroup = new FormGroup({
    nome: new FormControl(''),
    dataNasc: new FormControl(''),
    email: new FormControl(''),
    senha: new FormControl(''),
    avatar: new FormControl('')
  })

  constructor(
    private signupService: SignupService,
    private genAvatarService: GenAvatarService
  ){}

  ngOnInit(): void {
    this.generateRandomHash()
  }

  generateRandomHash(){
    for(let i = 0; i < 10; i++){
      let code = Math.floor(Math.random() * (999999 - 111111 ) + 111111);
      let hash = code.toString()
      this.generateAvatar(hash)
    }
  }

  generateAvatar(code: string ){
    let svgCode = multiavatar(code);
    this.transformToBase64(svgCode)
  }

  transformToBase64(image: string){
    const base64 =  window.btoa(image);
    const data = `data:image/svg+xml;base64,${base64}`
    if(this.avatars.length == 10){
      this.avatars = []
      this.avatars.push(data)
    }else this.avatars.push(data);

  }

  setAvatar(index:number, avatar: string){
    this.indexAvatarSelected = index;
    this.form.patchValue({
      avatar: avatar
    })
  }

  submit(){
    this.signupService.setUser(this.form.value).subscribe((res:any) => {
      if(res.error){
        this.error  = res
      }else{
        this.form.reset();
        this.indexAvatarSelected = undefined;
        this.created.emit();
      }
    })
  }
}
