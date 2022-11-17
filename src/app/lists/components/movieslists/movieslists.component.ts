import { Component, Input } from '@angular/core';
import { IListDetails } from '../../interfaces/list-details-response.interface';

@Component({
  selector: 'app-movieslists',
  templateUrl: './movieslists.component.html',
  styleUrls: ['./movieslists.component.scss'],
})
export class MovieslistsComponent {
  @Input() lists!: IListDetails[] | null;

  constructor() {}
}
