import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  buttonClicked: boolean = false;

  constructor(private movieService: MovieService, 
    formBuilder : FormBuilder) {
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
  }

  onSelect(genre: string){
    console.log("Pressed: "+!this.checkboxGroupForm.get(genre)?.value);

    this.getMovies();
    this.filterMovies(genre); //Skickar in genre som skall filtreras
    console.log("Filtered Movies: ",this.filteredMovies); // skriver ut korrekt lista på filmer med denna genre
    this.buttonClicked = !this.buttonClicked;
    
    //Tömmer de efter vi är klara, funkar ba med en kategori
    this.checkboxGroupForm.reset();
    this.movies = [];
    this.filteredMovies = [];
  }
  
  filterMovies(genre: string){
    this.movies.forEach(movie => {
      if(movie.Genre.toLowerCase().includes(genre.toLowerCase())){ //kontroll
        if(!this.filteredMovies.includes(movie)){
          this.filteredMovies.push(movie);  //ev tilläggning
        }
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