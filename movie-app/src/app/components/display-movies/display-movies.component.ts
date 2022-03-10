import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movies } from '../../Movie';

@Component({
  selector: 'app-display-movies',
  templateUrl: './display-movies.component.html',
  styleUrls: ['./display-movies.component.css'],
  
})
export class DisplayMoviesComponent implements OnInit, OnChanges {
  title: string = "Featured Movies"
  //Använd inte !: eller | undefined, gör movies till icket iterable.
  movies: Movies[] = [];
  filteredMovies: Movies[] = [];

  @Input() parentData: Movies[] = [];
  @Input() categoryClicked!: boolean;

  //Initiera alltid externa enheter i konstruktorn
  constructor(
    private movieService: MovieService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Changes caught",changes);
    if(changes['categoryClicked'].currentValue){
      this.filteredMovies = changes['parentData'].previousValue;
    }
  }

  //Funkar som componentDidMount från react.
  ngOnInit(): void {
    this.getMovies();
    //console.log("texttexttext", this.childData);
  }

  //Fyller i array movies som skall visa upp filmerna i html filen, använder interface för att fylla i värden från JSON
  getMovies() {
    this.movieService.getMovieId().forEach(id => {
      this.movieService.fetchMovie(id).subscribe(res => {
        //console.log(typeof(res.Title)); //Kolla om den är compatible med interface
        this.movies.push(res);
      });
    });
  }
}