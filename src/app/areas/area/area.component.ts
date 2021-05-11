import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/shared/area.model';
import { AreasService } from 'src/app/shared/areas.service';
import { BuildingsService } from 'src/app/shared/buildings.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent implements OnInit, OnDestroy {
  @Input() area: Area;
  currentBuildings = 0;
  buildingsChangedSub: Subscription;

  constructor(
    private buildingsService: BuildingsService,
    private areasService: AreasService
  ) {}

  ngOnInit(): void {
    this.currentBuildings = this.buildingsService.getBuildingsByAreaId(
      this.area.id
    ).length;

    this.buildingsChangedSub = this.buildingsService.buildingsChanged.subscribe(
      () => {
        this.currentBuildings = this.buildingsService.getBuildingsByAreaId(
          this.area.id
        ).length;
      }
    );
  }

  onDelete() {
    this.areasService.updateArea(this.area.id, 'status', 'inactive');
  }

  ngOnDestroy() {
    this.buildingsChangedSub.unsubscribe();
  }
}
