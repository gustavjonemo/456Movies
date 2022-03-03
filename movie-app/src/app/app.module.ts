import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FilterComponent } from './components/filter/filter.component';
import { DisplayMoviesComponent } from './components/display-movies/display-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    FilterComponent,
    DisplayMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
