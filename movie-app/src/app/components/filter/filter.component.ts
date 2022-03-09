import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
//import { NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
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
  @Output() ArrayEmitter = new EventEmitter<any[]>();
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

  sendArray(){
    this.ArrayEmitter.emit(this.filteredMovies)
  }

  ngOnInit(): void {
    this.getMovies();
    //this.getMovies();
    //this.addGenres();
  }

  onSelect(genre: string){
    //this.filterGenre = genre; 
    console.log("Vald Genre: "+genre);
    //this.checkboxGroupForm.get(genre)?.setValue(false);
    console.log("Pressed: "+!this.checkboxGroupForm.get(genre)?.value); //för att fatta mer om min checkBoxFormGroup
    this.getMovies();
    this.filterMovies(genre); //Skickar in genre som skall filtreras
    console.log(this.filteredMovies); // skriver ut korrekt lista på filmer med denna genre

    
    this.sendArray();

    //Tömmer de efter vi är klara, funkar ba med en kategori
    this.movies = [];
    this.filteredMovies = [];
  }

  addGenres(){
    this.movies.forEach(movie => {
      if(!!this.genres.includes(movie.Genre)){
        this.genres.push(movie.Genre);
      }
    });
  }

  filterMovies(genre: string){
    //this.getMovies(); //Hämtar filmerna som skall filtreras
    this.movies.forEach(movie => {
      //console.log(movie.Genre.toLowerCase() + " " + genre.toLowerCase())
      if( movie.Genre.toLowerCase().includes( genre.toLowerCase() ) ){ //kontroll
        //console.log("Vi kom in")
        this.filteredMovies.push(movie);  //ev tilläggning
      }
    });
    console.log(this.filteredMovies);
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