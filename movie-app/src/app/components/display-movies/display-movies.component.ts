import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services/movie.service';
import { Movies } from '../../Movie';

@Component({
  selector: 'app-display-movies',
  templateUrl: './display-movies.component.html',
  styleUrls: ['./display-movies.component.css']
})
export class DisplayMoviesComponent implements OnInit {

  constructor(
    private movieService: MovieService,
  ) { }
  title: string = "Movies"
  movies!: Movies;
  moviesArray!: Movies[];

  ngOnInit(): void {
    this.movieService.fetchMovies().subscribe(res => {
      console.log("API: ");
      console.log(res)
      this.movies = res;
      console.log("Movies: ")
      console.log(this.movies);
    })
  }
  
}
