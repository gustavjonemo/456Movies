import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayMoviesComponent } from './components/display-movies/display-movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

const routes: Routes = [
  {path: '', component: DisplayMoviesComponent},
  {path:"movie-details/:imdbID", component: MovieDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
