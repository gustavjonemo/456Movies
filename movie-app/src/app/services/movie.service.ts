import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movies } from '../Movie';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  //Id på filmer som skall visas på framsidan
  private ids = ['tt3896198', 'tt1160419'];

  constructor(
    private http: HttpClient
  ) { }

  //http fetch request av en film med ett specifikt id.
  fetchMovie(imdbId: string): Observable<Movies> {
    console.log("Here");
    const apiURL = `http://www.omdbapi.com/?i=${imdbId}&apikey=1d799ea5`;
    return this.http.get<Movies>(apiURL);
  }

  //Används för att hämta alla filmernas id.
  getMovieId(){
    return this.ids;
  }
}
