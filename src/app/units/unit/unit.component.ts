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

  constructor(private unitsService: UnitsService) {}

  ngOnInit(): void {}

  onUnitClick() {
    this.unitsService.unitIdClickedForNewContract.next(this.unit);
  }
}
