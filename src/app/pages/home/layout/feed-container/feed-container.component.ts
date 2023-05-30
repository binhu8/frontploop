import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { UserResponse } from 'src/app/models/user-response';
import { PublicationService } from 'src/app/services/publication.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-feed-container',
  templateUrl: './feed-container.component.html',
  styleUrls: ['./feed-container.component.scss']
})
export class FeedContainerComponent implements OnInit{

  @ViewChildren('textarea') textareas: QueryList<ElementRef>

  index: any = undefined;
  editMode: boolean = false
  loaded: boolean = false
  userData: UserResponse = undefined;
  publications: any[] = [];
  items: any[] = []
  myMenuItems: MenuItem[];
  showComments: boolean = false;

  form: FormGroup = new FormGroup({
        conteudo: new FormControl(''),
        autor: new FormControl('')

  })
  constructor(
    private userDataService: UserDataService,
    private publicationService: PublicationService,
    private confirmationService: ConfirmationService
  ){}

  ngOnInit(): void {

    this.userDataService.$userUpdate.subscribe(res => {
      this.userData = res
    });
    this.publicationService.getFeedPublicatoins(this.userData._id).subscribe((res : any) => {
      this.publications = res.data
      this.publications.forEach((publication, index) => {
        if(publication.pub.autor == this.userData._id){
          const myItem: any= [
            {label: 'denunciar', icon: 'pi pi-info-circle', id: index },
            {label: 'editar', icon: 'pi pi-pencil', id: index, command: (originalEvent: any) => {
                this.edit(originalEvent.item.id)
              }
            },
            {label: 'excluir', icon: 'pi pi-trash', id: index, command: (originalEvent: any) => {
              this.delete(originalEvent.item.id)
              }
            }
         ]

          this.items.push(myItem)
        }else{
          const item:any = [
            {label: 'denunciar', icon: 'pi pi-info-circle', id: index }
          ]
          this.items.push(item)
        }
      });
      this.loaded = true
    });




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
        console.log(res)
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

  delete(indexDelete){

    this.confirmationService.confirm({
      message: 'você deseja excluir permanentemente essa publicação?',
      accept: ()=> {
        let idDelete: string = ''
        this.publications = this.publications.filter((publication, index) => {
          if(index == indexDelete){
            idDelete = publication.pub._id
          }
          return index != indexDelete
        })

        this.items = this.items.filter((item, index) => {
          item.forEach(menuItem => {
            menuItem.id = parseInt(menuItem.id) - 1
          })
          return index != indexDelete
        })
        this.publicationService.deletePublicaton(idDelete).subscribe()
      },
      acceptLabel: 'Sim',
      rejectLabel: 'Cancelar'
    });
  }

  edit(index){
    this.textareas.toArray()[index].nativeElement.readOnly = false;
    this.index = index;
    this.editMode = true;
  }

  setUpdate(){
    this.editMode = false;
    this.textareas.toArray()[this.index].nativeElement.readOnly = true;
    this.publications[this.index].pub.conteudo = this.textareas.toArray()[this.index].nativeElement.value;
    this.publicationService.updatePublication(this.publications[this.index].pub).subscribe()
  }

}
