import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-setting-item',
  templateUrl: './setting-item.component.html',
  styleUrls: ['./setting-item.component.scss']
})
export class SettingItemComponent {
  @Input() text?: string
  toggled: boolean = false

  toggle() {
    this.toggled = !this.toggled
  }
}
