import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services/movie.service';
import { Movies } from '../../Movie';

@Component({
  selector: 'app-display-movies',
  templateUrl: './display-movies.component.html',
  styleUrls: ['./display-movies.component.css']
})
export class DisplayMoviesComponent implements OnInit {

  constructor() { }
  title: string = "Movies"

  ngOnInit(): void {
  }

}
