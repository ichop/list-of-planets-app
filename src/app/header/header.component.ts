import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isSearchBarVisible = false;
  planetName: string;

  constructor(private location: Location) {
    this.location.onUrlChange(e => {
     this.isSearchBarVisible = this.location.path() === '/planets';
    });
  }

  ngOnInit() {
    console.log();
  }

  onInputChange(event) {
    console.log(this.planetName);
  }




}
