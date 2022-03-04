import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movies } from '../Movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  //Id på filmer som skall visas på framsidan, lägg till flera.
  private ids = ['tt3896198', 'tt1160419','tt0120338', 'tt10223460', 'tt0117571', 'tt0245429',];

  constructor(
    private http: HttpClient
  ) { }

  //http fetch request av en film med ett specifikt id. &plot=full för hela ploten av filmen
  fetchMovie(imdbId: string): Observable<Movies> {
    //console.log("Here");
    const apiURL = `http://www.omdbapi.com/?i=${imdbId}&apikey=1d799ea5&plot=full`;
    return this.http.get<Movies>(apiURL);
  }

  //Används för att hämta alla filmernas id.
  getMovieId(){
    return this.ids;
  }
}
