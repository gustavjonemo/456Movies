import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movies } from '../Movie';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private ids = ['tt3896198', ];
  private apiURL = "http://www.omdbapi.com/?i=tt3896198&apikey=1d799ea5"

  constructor(
    private http: HttpClient
  ) { }

  fetchMovies(): Observable<Movies> {
    console.log("Here");
    return this.http.get<Movies>(this.apiURL)
  }
}
