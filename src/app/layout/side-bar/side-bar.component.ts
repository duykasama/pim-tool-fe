import { Component } from '@angular/core';
import {HttpContext} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  constructor(router: Router) {
    this.currentRoute = router.url.slice(1, router.url.length)
  }
  currentRoute = ''
  selectRout(selectedRoute: string): void {
    this.currentRoute = selectedRoute
    console.log(HttpContext.name)
  }

}
