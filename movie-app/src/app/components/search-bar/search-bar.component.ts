import { Component , ViewChild, ElementRef, OnInit} from '@angular/core';
import { fromEvent } from "rxjs";
import { debounceTime, map, distinctUntilChanged, filter} from "rxjs/operators";
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})

export class SearchBarComponent implements OnInit{
  @ViewChild('movieSearchInput', { static: true })
  movieSearchInput!: ElementRef;
  movieDetails: any[] = [];
  loading: boolean = false;
  search : String ="";
  
  constructor(
    private movieService: MovieService,
  ) {  }

  ngOnInit() {
    fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)
      // Time in milliseconds between key events
      , debounceTime(400)
      // If previous query is diffent from current   
      , distinctUntilChanged()
      // subscription for response
    ).subscribe((text: string) => {
      this.movieService.searchGetCall(text).subscribe((res) => {
        this.loading = true;
        this.getMovies(res.Search.filter((name: { Poster: string, Type: string}) => 
        name.Poster !== "N/A" && name.Type === "movie" 
      ));
        this.loading = false;
        this.emptyArray(); //Empty movieDetails to facilitate smooth updating
      });
    });
  }

  getMovies(apiResults: any[]){
    apiResults.forEach(e => {
      this.movieService.fetchMovie(e.imdbID).subscribe(res => {
        this.movieDetails.push(res);
      })
    })
  }

  emptyArray(){
    return this.movieDetails = [];
  }
}