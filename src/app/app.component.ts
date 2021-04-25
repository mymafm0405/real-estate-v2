import { AreasService } from './shared/areas.service';
import { Component, OnInit } from '@angular/core';
import { BuildingsService } from './shared/buildings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'real-estate-v2';

  constructor(
    private areasService: AreasService,
    private buildingsService: BuildingsService
  ) {}

  ngOnInit() {
    this.areasService.loadAreas();
    this.buildingsService.loadBuildings();
  }
}
