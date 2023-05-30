import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Publication } from '../models/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(
    private http: HttpClient
  ) { }

  getFeedPublicatoins(id: string){
    return this.http.get<any>(`${environment.api}/publication/seguidores/${id}`)
  }

  setLikeInPublication(idPublication, publication){
    return this.http.post(`${environment.api}/publication/curtir/${idPublication}`, publication)
  }

  createPublication(publication: Publication) {
    return this.http.post(`${environment.api}/publication`, publication)
  }

  getComments(payload){
    return this.http.post(`${environment.api}/comentario/comentarios`, payload)
  }

  setComment(comment: any){
    return this.http.post(`${environment.api}/comentario`,comment)
  }

  getMostLIkedPublication(autores: any[]){
    return this.http.post(`${environment.api}/publication/destaques`, autores)
  }

  getUserPublicationsById(id: string){
    console.log(id, 1)
    return this.http.get(`${environment.api}/publication/${id}`)
  }

  deletePublicaton(id){
    return this.http.delete(`${environment.api}/publication/${id}`)
  }

  updatePublication(publication){
    return this.http.put(`${environment.api}/publication`, publication)
  }
}
