import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {routes} from "../../core/constants/routeConstants";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  constructor(private store: Store<{route: string}>) { }

  currentRoute = ''

  ngOnInit() {
    this.store.select('route').subscribe(value => this.currentRoute = value)
  }

  protected readonly routes = routes;
}
