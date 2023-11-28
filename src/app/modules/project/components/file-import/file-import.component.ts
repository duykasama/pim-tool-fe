import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-import',
  templateUrl: './file-import.component.html',
  styleUrls: ['./file-import.component.scss'],
})
export class FileImportComponent {
  @Output() hide: EventEmitter<void> = new EventEmitter()
}
