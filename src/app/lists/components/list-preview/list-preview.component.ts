import { Component, Input } from '@angular/core';
import { IListDetails } from '../../interfaces/list-details-response.interface';

@Component({
  selector: 'app-list-preview',
  templateUrl: './list-preview.component.html',
  styleUrls: ['./list-preview.component.scss'],
})
export class ListPreviewComponent {
  @Input() list!: IListDetails;

  constructor() {}
}
