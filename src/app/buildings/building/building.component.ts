import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/shared/area.model';
import { AreasService } from 'src/app/shared/areas.service';
import { Building } from 'src/app/shared/building.model';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css'],
})
export class BuildingComponent implements OnInit, OnDestroy {
  @Input() building: Building;

  areasChangedSub: Subscription;
  area: Area;

  constructor(private areasService: AreasService) {}

  ngOnInit(): void {
    this.area = this.areasService.getAreaById(this.building.areaId);
    this.areasChangedSub = this.areasService.areasChanged.subscribe(() => {
      this.area = this.areasService.getAreaById(this.building.areaId);
    });
  }

  ngOnDestroy() {
    this.areasChangedSub.unsubscribe();
  }
}
