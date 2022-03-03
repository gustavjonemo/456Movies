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
  //använd inte !: eller | undefined, gör movies till icket iterable.
  movies: Movies[] = [];

  constructor(
    private movieService: MovieService,
  ) { }

  //Funkar som componentDidMount från react.
  ngOnInit(): void {
    this.getMovies();
  }

  //Fyller i array movies som skall visa upp filmerna i html filen, använder interface för att jämföra JSON med
  getMovies() {
    this.movieService.getMovieId().forEach(id => {
      this.movieService.fetchMovie(id).subscribe(res => {
        //console.log(typeof(res.Title)); //Kolla om den är compatible med interface
        this.movies.push(res);
      });
    });
  }
}
