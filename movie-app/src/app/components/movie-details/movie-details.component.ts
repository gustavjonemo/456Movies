import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movies } from '../../Movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movies: Movies[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  //API hämtas igen för att alla filmer från serch field skall kunna hämtas
  getMovie(): void{
    const routeParams = this.route.snapshot.paramMap;
    const movieIdFromRoute = String(routeParams.get('imdbID'));

    this.movieService.fetchMovie(movieIdFromRoute).subscribe(res => {
      this.movies.push(res);
    });
  }
}