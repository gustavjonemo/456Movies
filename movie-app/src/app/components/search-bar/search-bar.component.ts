import { Component , ViewChild, ElementRef, OnInit} from '@angular/core';
import { of } from "rxjs";
import { debounceTime, map, distinctUntilChanged, filter} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

//import { DisplayMoviesComponent } from '../display-movies/display-movies.component';
import { MovieService } from '../../services/movie.service';

const APIKEY = "1d799ea5";

const PARAMS = new HttpParams({
  fromObject: {
    action: "opensearch",
    format: "json",
    origin: "*"
  }
});

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit{
  @ViewChild('movieSearchInput', { static: true })
  movieSearchInput!: ElementRef;
  apiResponse: any;
  isSearching: boolean;
  movieDetails: any;
  name:string='';

  ngAfterViewInit() {
    //this.elementRef.nativeElement.ownerDocument
    //    .body.style.backgroundColor = 'purple';
}
  constructor(
    private elementRef: ElementRef,
    private httpClient: HttpClient,

    private movieService: MovieService,
    //private displayMovies: DisplayMoviesComponent,
  ) {
    this.isSearching = false;
    this.apiResponse = [];
    this.movieDetails = [];

    //console.log(this.movieSearchInput);
    //console.log("Test1");
    //this.displayMovies.movies = [];
  }


  ngOnInit() {
    console.log(this.movieSearchInput);

    fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(

      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)

      // Time in milliseconds between key events
      , debounceTime(1000)

      // If previous query is diffent from current   
      , distinctUntilChanged()

      // subscription for response
    ).subscribe((text: string) => {

      this.isSearching = true;

      this.searchGetCall(text).subscribe((res) => {
        //console.log('res', res);
        this.isSearching = false;
        this.getMovies(res.Search .filter((name: { Poster: string, Type: string;}) => //Du kan lägga till fler filter om du vill
        name.Poster !== "N/A" && name.Type === "movie"
      ));
        this.apiResponse = res;
        console.log(this.movieDetails);
        this.emptyArray(); //Töm för att inte uppdatering skall haka upp sig
      }, (err) => {
        this.isSearching = false;
        //console.log('error', err);
      });

    });

  }

  searchGetCall(term: string): Observable<any> {
    if (term === '') {
      return of([]);
    }
    
    return this.httpClient.get('http://www.omdbapi.com/?s=' + term + '&apikey=' + APIKEY, { params: PARAMS.set('search', term) });
  }


  isShowDiv = true; 
  getDetails(movie: any){
    this.name= movie.Title;
    this.isShowDiv = false;
    this.httpClient.get('http://www.omdbapi.com/?i=' + movie.imdbID + '&apikey=' + APIKEY, { params: PARAMS.set('search', movie.imdbID) })
    .subscribe(data=> {
      //console.log('res', data);
      this.movieDetails=data;
    })
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


/*
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  title: string = 'Search bar component';

  constructor() { }

  ngOnInit(): void {
  }

}
*/