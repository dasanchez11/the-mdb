import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent {
  imagePath = 'https://image.tmdb.org/t/p/w500';
  @Input() id!: number;
  @Input() title!: string;
  @Input() released!: string;
  @Input() voteAvg!: number;
  @Input() voteCount!: number;
  @Input() popularity!: number;
  @Input() imageUrl!: string;

  constructor(private router: Router) {}

  handleClick() {
    console.log('click');
    this.router.navigate(['/movies', this.id]);
  }
}
