import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/shared/area.model';
import { AreasService } from 'src/app/shared/areas.service';
import { Building } from 'src/app/shared/building.model';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { UnitsService } from 'src/app/shared/units.service';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css'],
})
export class BuildingComponent implements OnInit, OnDestroy {
  @Input() building: Building;
  remainingUnits = 0;

  areasChangedSub: Subscription;
  area: Area;

  unitsChangedSub: Subscription;

  constructor(
    private areasService: AreasService,
    private buildingsService: BuildingsService,
    private unitsService: UnitsService
  ) {}

  ngOnInit(): void {
    this.area = this.areasService.getAreaById(this.building.areaId);
    this.areasChangedSub = this.areasService.areasChanged.subscribe(() => {
      this.area = this.areasService.getAreaById(this.building.areaId);
    });

    this.countRemaining();
    this.unitsChangedSub = this.unitsService.unitsChanged.subscribe(() => {
      this.countRemaining();
    });
  }

  countRemaining() {
    this.remainingUnits =
      this.building.unitsQuantity -
      this.buildingsService.countUnitsRentedByBuildingId(this.building.id);
  }

  ngOnDestroy() {
    this.areasChangedSub.unsubscribe();
    this.unitsChangedSub.unsubscribe();
  }
}
