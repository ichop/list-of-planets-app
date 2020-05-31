import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {CommunicationService} from '../../../modules/services/communication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isSearchBarVisible = false;
  planetName: string;

  constructor(private location: Location, private communicationService: CommunicationService) {
    this.location.onUrlChange(() => {
      this.isSearchBarVisible = this.location.path() === '/planets';
    });
  }

  ngOnInit() {
  }

  onInputChange() {
    this.communicationService.emitChange(this.planetName);
  }

}
