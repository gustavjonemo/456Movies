import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMoviesComponent } from './display-movies.component';

describe('DisplayMoviesComponent', () => {
  let component: DisplayMoviesComponent;
  let fixture: ComponentFixture<DisplayMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
