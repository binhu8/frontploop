import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicationService } from 'src/app/services/publication.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit{

  @Input('comments') comments: any = {}
  @Input('publication') publication: string = '';
  @Input('userData') userData: any = undefined

  dataSource: any[] = [];
  isDarkMode: boolean = false;

  form: FormGroup = new FormGroup({
    autor: new FormControl(''),
    conteudo: new FormControl(''),
    publicacao: new FormControl('')
  })

  constructor(
    private publicationService: PublicationService,
    private userDataService: UserDataService,
    private router: Router
  ){}

  ngOnChanges(change: SimpleChange){
    if(change['comments']){
      this.getComments(change['comments'].currentValue)
    }
  }

  ngOnInit(): void {
    const mode = localStorage.getItem('theme');
    if(mode && mode == 'dark') this.isDarkMode = true;
    if(mode && mode == 'light') this.isDarkMode = false
  }

  getComments(comments){
    const payload = {
      publication: this.publication,
      comments: this.comments
    }
    this.publicationService.getComments(payload).subscribe((res: any) => {
      this.dataSource = res
    })
  }

  comment(publication){
    this.form.patchValue({publicacao: publication, autor: this.userData._id})
    if(this.form.value.conteudo.length > 0){
      this.publicationService.setComment(this.form.value ).subscribe(res => {
        window.location.reload()
      })
    }
  }
}
