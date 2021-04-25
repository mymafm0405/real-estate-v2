import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

  constructor(private buildingsService: BuildingsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.getBuildings(params);
        this.buildingsChangedSub = this.buildingsService.buildingsChanged.subscribe(
          () => {
            this.getBuildings(params);
          }
        );
      }
    )
  }

  getBuildings(params: Params) {
    if (params.areaId !== 'all') {
      this.allBuildings = this.buildingsService.getBuildingsByAreaId(params.areaId);
    } else {
      this.allBuildings = this.buildingsService.getBuildings();
    }
  }

  ngOnDestroy() {
    this.buildingsChangedSub.unsubscribe();
  }
}
