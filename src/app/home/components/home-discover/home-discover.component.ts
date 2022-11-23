import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-discover',
  templateUrl: './home-discover.component.html',
  styleUrls: ['./home-discover.component.scss'],
})
export class HomeDiscoverComponent {
  imageUrl =
    'https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/zqkmTXzjkAgXmEWLRsY4UpTWCeo.jpg';

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  constructor(private router: Router) {}

  handleSubmit() {
    const search = this.searchForm.value.search;
    this.router.navigate(['/search'], {
      queryParams: {
        search,
      },
    });
  }
}
