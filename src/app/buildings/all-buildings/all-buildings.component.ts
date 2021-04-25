import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Building } from 'src/app/shared/building.model';
import { BuildingsService } from 'src/app/shared/buildings.service';

@Component({
  selector: 'app-all-buildings',
  templateUrl: './all-buildings.component.html',
  styleUrls: ['./all-buildings.component.css'],
})
export class AllBuildingsComponent implements OnInit, OnDestroy {
  allBuildings: Building[] = [];
  buildingsChangedSub: Subscription;

  constructor(private buildingsService: BuildingsService) {}

  ngOnInit(): void {
    this.allBuildings = this.buildingsService.getBuildings();

    this.buildingsChangedSub = this.buildingsService.buildingsChanged.subscribe(
      () => {
        this.allBuildings = this.buildingsService.getBuildings();
      }
    );
  }

  ngOnDestroy() {
    this.buildingsChangedSub.unsubscribe();
  }
}
