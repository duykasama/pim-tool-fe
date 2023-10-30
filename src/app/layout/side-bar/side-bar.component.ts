import { Component } from '@angular/core';
import {HttpContext} from "@angular/common/http";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  currentRoute = ''
  selectRout(selectedRoute: string): void {
    this.currentRoute = selectedRoute
    console.log(HttpContext.name)
  }

}
