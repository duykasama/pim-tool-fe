import { Component } from '@angular/core';
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  protected readonly faChevronRight = faChevronRight;
  protected readonly faChevronLeft = faChevronLeft;
}
