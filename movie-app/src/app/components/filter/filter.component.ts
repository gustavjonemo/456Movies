import { Component, OnInit } from '@angular/core';
import { NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Movies } from 'src/app/Movie';

import { MovieService } from 'src/app/services/movie.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  public checkboxGroupForm: FormGroup;
  title: string = 'Filter component';
  movies: Movies[] = [];
  filteredMovies: Movies[] = [];
  genres: string[] = [];
  filterGenre: string = '';  //den vi matchar mot filmgenre
  constructor(private movieService: MovieService, formBuilder : FormBuilder
    ) {
      this.checkboxGroupForm = formBuilder.group({ // göra typ en for each där vi fyller alla genres som finns
        
        
        action: false,
        adventure: false,
        animation: false,
        anime: false,
        biography: false,
        christmas: false
      });
     }

  ngOnInit(): void {
    this.getMovies();
    this.addGenres();
    this.filterMovies();
  }

  addGenres(){
    this.movies.forEach(movie => {
      if(!!this.genres.includes(movie.Genre)){
        this.genres.push(movie.Genre);
      }
    });
  }
  filterMovies(){
    this.movies.forEach(movie => {
      if(movie.Genre == this.filterGenre){ //kontroll
        this.filteredMovies.push(movie);  //ev tilläggning
      }
    });
  }
  /* Gets movies by genre*/
  getMovies() {
    this.movieService.getMovieId().forEach(id => {
      this.movieService.fetchMovie(id).subscribe(res => {
        //console.log(typeof(res.Title)); //Kolla om den är compatible med interface
        this.movies.push(res);
      });
    });
  }

}
