import { UnitsService } from './../../shared/units.service';
import { Component, Input, OnInit } from '@angular/core';
import { Unit } from 'src/app/shared/unit.model';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css'],
})
export class UnitComponent implements OnInit {
  @Input() unit: Unit;
  allRented = false;

  constructor(private unitsService: UnitsService) {}

  ngOnInit(): void {}

  onUnitClick() {
    if (this.unit.numOfRented < this.unit.quantity) {
      this.unitsService.unitIdClickedForNewContract.next(this.unit);
    } else {
      this.allRented = true;
      setTimeout(() => {
        this.allRented = false;
      }, 2500);
    }
  }

  onDelete() {
    this.unitsService.deleteUnit(this.unit.id);
  }
}
