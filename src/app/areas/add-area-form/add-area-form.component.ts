import { Area } from './../../shared/area.model';
import { AreasService } from './../../shared/areas.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-area-form',
  templateUrl: './add-area-form.component.html',
  styleUrls: ['./add-area-form.component.css']
})
export class AddAreaFormComponent implements OnInit, OnDestroy {
  @ViewChild('addForm', {static: false}) addForm: NgForm;
  addingSub: Subscription;
  addingStatus: boolean;
  loading = false;

  constructor(private areasService: AreasService) { }

  ngOnInit(): void {
    this.addingSub = this.areasService.areaAddingStatus.subscribe(
      (status: boolean) => {
        this.loading = false;
        this.addingStatus = status;
        this.addForm.reset();

        setTimeout(() => {
          this.addingStatus = undefined;
        }, 2500);
      }
    )
  }

  onSubmit() {
    this.loading = true;
    const { name, address } = this.addForm.value;
    const newArea: Area = new Area(name, address);
    this.areasService.addArea(newArea);
  }

  ngOnDestroy() {
    this.addingSub.unsubscribe();
  }

}
