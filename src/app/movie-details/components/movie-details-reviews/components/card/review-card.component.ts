import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-reviews',
  templateUrl: './review-card.component.html',
})
export class ReviewCardComponent implements OnInit {
  @Input() author!: string;
  @Input() avatarPath!: string;
  @Input() rating!: number;
  @Input() username!: string;
  @Input() createdAt!: string;
  @Input() content!: string;

  constructor() {}

  ngOnInit(): void {}
}
