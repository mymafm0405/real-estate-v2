import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Unit } from 'src/app/shared/unit.model';
import { UnitsService } from 'src/app/shared/units.service';

@Component({
  selector: 'app-add-unit-form',
  templateUrl: './add-unit-form.component.html',
  styleUrls: ['./add-unit-form.component.css'],
})
export class AddUnitFormComponent implements OnInit, OnDestroy {
  @ViewChild('addForm', { static: false }) addForm: NgForm;
  @Input() buildingId: string;
  addingStatus: boolean;
  loading = false;
  addingStatusSub: Subscription;

  constructor(private unitsService: UnitsService) {}

  ngOnInit(): void {
    this.addingStatusSub = this.unitsService.unitAddingStatus.subscribe(
      (status: boolean) => {
        this.addForm.reset();
        this.loading = false;
        this.addingStatus = status;
        setTimeout(() => {
          this.addingStatus = undefined;
        });
      }
    );
  }

  onSubmit() {
    this.loading = true;
    const { name, description, price } = this.addForm.value;
    const newUnit: Unit = new Unit(
      name,
      description,
      price,
      this.buildingId,
      'empty'
    );
    this.unitsService.addUnit(newUnit);
  }

  ngOnDestroy() {
    this.addingStatusSub.unsubscribe();
  }
}
