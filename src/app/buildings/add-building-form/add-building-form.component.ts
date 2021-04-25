import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/shared/area.model';
import { AreasService } from 'src/app/shared/areas.service';
import { Building } from 'src/app/shared/building.model';
import { BuildingsService } from 'src/app/shared/buildings.service';

@Component({
  selector: 'app-add-building-form',
  templateUrl: './add-building-form.component.html',
  styleUrls: ['./add-building-form.component.css'],
})
export class AddBuildingFormComponent implements OnInit, OnDestroy {
  @ViewChild('addForm', { static: false }) addForm: NgForm;
  allAreas: Area[] = [];

  areasChangedSub: Subscription;
  addingBuildingSub: Subscription;
  addingStatus: boolean;
  loading = false;

  constructor(
    private areasService: AreasService,
    private buildingsService: BuildingsService
  ) {}

  ngOnInit(): void {
    this.allAreas = this.areasService.getAreas();
    this.areasChangedSub = this.areasService.areasChanged.subscribe(() => {
      this.allAreas = this.areasService.getAreas();
    });

    this.addingBuildingSub = this.buildingsService.buildingAddingStatus.subscribe(
      (status: boolean) => {
        this.addingStatus = status;
        this.loading = false;
        this.addForm.reset();
        setTimeout(() => {
          this.addingStatus = undefined;
        }, 2500);
      }
    );
  }

  onSubmit() {
    this.loading = true;
    const { name, description, areaId } = this.addForm.value;
    const newBuilding: Building = new Building(
      name,
      description,
      areaId,
      'empty'
    );
    this.buildingsService.addBuilding(newBuilding);
  }

  ngOnDestroy() {
    this.areasChangedSub.unsubscribe();
    this.addingBuildingSub.unsubscribe();
  }
}
