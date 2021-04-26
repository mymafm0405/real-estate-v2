import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Unit } from 'src/app/shared/unit.model';
import { UnitsService } from 'src/app/shared/units.service';

@Component({
  selector: 'app-all-units',
  templateUrl: './all-units.component.html',
  styleUrls: ['./all-units.component.css'],
})
export class AllUnitsComponent implements OnInit, OnDestroy {
  @Input() buildingId: string;
  units: Unit[] = [];
  unitsChangedSub: Subscription;

  constructor(private unitsService: UnitsService) {}

  ngOnInit(): void {
    this.units = this.unitsService.getUnitsByBuildingId(this.buildingId);
    this.unitsChangedSub = this.unitsService.unitsChanged.subscribe(() => {
      this.units = this.unitsService.getUnitsByBuildingId(this.buildingId);
    });
  }

  ngOnDestroy() {
    this.unitsChangedSub.unsubscribe();
  }
}
