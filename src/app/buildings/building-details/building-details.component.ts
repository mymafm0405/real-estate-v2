import { AreasService } from './../../shared/areas.service';
import { Area } from './../../shared/area.model';
import { BuildingsService } from './../../shared/buildings.service';
import { Building } from './../../shared/building.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.css']
})
export class BuildingDetailsComponent implements OnInit, OnDestroy {
  building: Building;
  buildingsChangedSub: Subscription;
  areasChangedSub: Subscription;

  area: Area;

  constructor(private route: ActivatedRoute, private buildingsService: BuildingsService, private areasService: AreasService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.building = this.buildingsService.getBuildingById(params.id);
        this.getArea();

        this.buildingsChangedSub = this.buildingsService.buildingsChanged.subscribe(
          () => {
            this.building = this.buildingsService.getBuildingById(params.id);
            this.getArea();
          }
        )

        this.areasChangedSub = this.areasService.areasChanged.subscribe(
          () => {
            this.getArea();
          }
        )
      }
    )
  }

  getArea() {
    if (this.building !== undefined) {
      this.area = this.areasService.getAreaById(this.building.areaId);
    }
  }

  ngOnDestroy() {
    this.buildingsChangedSub.unsubscribe();
    this.areasChangedSub.unsubscribe();
  }

}
