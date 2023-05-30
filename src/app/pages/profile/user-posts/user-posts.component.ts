import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserResponse } from 'src/app/models/user-response';
import { PublicationService } from 'src/app/services/publication.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {


  loaded: boolean = false
  userData: UserResponse = undefined;
  publications: any[] = [];
  items: MenuItem[];
  showComments: boolean = false;
  id: string = undefined
  loggedUser: UserResponse = undefined

  form: FormGroup = new FormGroup({
        conteudo: new FormControl(''),
        autor: new FormControl('')

  })
  constructor(
    private userDataService: UserDataService,
    private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.userDataService.$userUpdate.subscribe(res => {
      this.loggedUser = res
    })

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id) this.userDataService.getUserById(this.id).subscribe(res => {
      this.userData =  res
      this.getPublications()
    });

    if(this.id == this.loggedUser._id ){
      this.items = [
        {label: 'denunciar', icon: 'pi pi-info-circle' },
        {label: 'excluir', icon: 'pi pi-trash' },
      ]
    }else{
      this.items = [
        {label: 'denunciar', icon: 'pi pi-info-circle' },
      ]
    }


  }

  getPublications(){
    if(this.userData){
      console.log(111111)
      this.publicationService.getUserPublicationsById(this.userData._id).subscribe((res : any) => {


        res.forEach(publication => {
          const publications = {
            pub: publication,
            autor: this.userData
          }
          this.publications.push(publications)
        })

        this.loaded = true
      });
    }

  }

  getHourLater(dataCriacao): string{
    const nowMileseconds = Date.now();
    const now:any = new Date( nowMileseconds)
    const criacao: any = new Date(dataCriacao)
    const milesegundos = now - criacao;
    const segundos = milesegundos / 1000;
    const minutos = segundos / 60;
    const horas = minutos / 60;
    const dias = horas / 24;
    const meses = dias / 30;
    const anos = meses / 12;

    if(minutos >= 1 && horas < 1){
      return `${Math.floor(minutos)} ${Math.floor(minutos) > 1 ? 'Minutos atrás' : 'Minuto Atrás'}`
    }else if(horas >= 1 && dias < 1){
      return `${Math.floor(horas)} ${Math.floor(horas) > 1 ? 'Horas atrás' : 'Hora Atrás'}`
    }else if(dias >= 1 && meses < 1){
      return `${Math.floor(dias)} ${Math.floor(dias) > 1 ? 'Dias atrás' : 'Dia Atrás'}`
    }else if(meses >= 1 && anos < 1){
      return `${Math.floor(meses)} ${Math.floor(meses) > 1 ? 'Meses atrás' : 'Mês Atrás'}`
    }else if(anos >= 1){
      return `${Math.floor(anos)} ${Math.floor(anos) > 1 ? 'Anos atrás' : 'Ano Atrás'}`
    }else{
      return 'Alguns segundos Atrás'
    }
  }


  setLike(publication:any){

    if(publication.curtidas.includes(this.userData._id)){
      publication.curtidas = publication.curtidas.filter(id => {
        return id != this.userData._id
      })
      this.publicationService.setLikeInPublication(publication._id, publication ).subscribe(res => {
      })
    }else{
      publication.curtidas.push(this.userData._id)

      this.publicationService.setLikeInPublication(publication._id, publication ).subscribe(res => {
        console.log(res)
      })
    }
  }

  publish(){

    if(this.form.value.conteudo.length > 0){
      console.log(this.form.value)
      this.form.patchValue({autor: this.userData._id});
      this.publicationService.createPublication(this.form.value).subscribe( (res:any) => {
        if(res.error){
          console.log(res.message);
          return
        }

        window.location.reload();
      })
    }

  }

}
