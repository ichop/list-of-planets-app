import {Component,  OnInit} from '@angular/core';
import {Location} from "@angular/common";

import {SharedService} from "../services/SharedService";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  isSearchBarVisible = false;
  planetName: string;

  constructor(private location: Location, private sharedService: SharedService) {
    this.location.onUrlChange(() => {
     this.isSearchBarVisible = this.location.path() === '/planets';
    });
  }

  ngOnInit() {
    console.log();
  }

  onInputChange() {
    this.sharedService.emitChange(this.planetName);
  }






}
