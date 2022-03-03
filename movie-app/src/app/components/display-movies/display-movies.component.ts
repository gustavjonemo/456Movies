import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services/movie.service';
import { Movies } from '../../Movie';

@Component({
  selector: 'app-display-movies',
  templateUrl: './display-movies.component.html',
  styleUrls: ['./display-movies.component.css']
})
export class DisplayMoviesComponent implements OnInit {
  title: string = "Movies"
  movies: Movies[] = [];

  constructor(
    private movieService: MovieService,
  ) { }

  //Funkar som componentDidMount från react.
  ngOnInit(): void {
    this.getMovies();
  }

  //Fyller i array movies som skall visa upp filmerna i html filen, använder interface för att jämföra JSON med
  getMovies(): void {
    this.movieService.getMovieId().forEach(id => {
      this.movieService.fetchMovie(id).subscribe(res => {
        //console.log(typeof(res.Title)); //Kolla om den är compatible med interface
        this.movies.push({
          Title: res.Title,
          Year: res.Year,
          Rated: res.Rated,
          Released: res.Released,
          Runtime: res.Runtime,
          Genre: res.Genre,
          Director: res.Director,
          Writer: res.Writer,
          Actors: res.Actors,
          Plot: res.Plot,
          Poster: res.Poster,
          imdbID: res.imdbID,
          imdbRating: res.imdbRating
        });
      })
    })
  }
}
