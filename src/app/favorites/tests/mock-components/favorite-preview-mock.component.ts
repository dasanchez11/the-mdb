import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/home/interfaces/movies.interface';
  
  @Component({
    selector: 'app-favorite-preview',
    template: '<div>Mock</div>'
  })
  export class MockFavoritesPreviewComponent {
    @Input() movie! : Movie

    constructor() {}
  
  }
  