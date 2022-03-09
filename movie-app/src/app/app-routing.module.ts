import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayMoviesComponent } from './components/display-movies/display-movies.component';
import { FilterComponent } from './components/filter/filter.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

//Lägg in här om det skall komma in flera routes, renderas i <router-outlet>
const routes: Routes = [
  {path: '', component: SearchBarComponent},
  {path:"movie-details/:imdbID", component: MovieDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
