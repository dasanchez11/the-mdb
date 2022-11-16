import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {
  imagePath = 'https://image.tmdb.org/t/p/w500';
  @Input() title!: string;
  @Input() released!: string;
  @Input() voteAvg!: number;
  @Input() voteCount!: number;
  @Input() popularity!: number;
  @Input() imageUrl!: string;

  constructor() {}

  ngOnInit(): void {}
}
