import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/shared/area.model';
import { AreasService } from 'src/app/shared/areas.service';

@Component({
  selector: 'app-all-areas',
  templateUrl: './all-areas.component.html',
  styleUrls: ['./all-areas.component.css'],
})
export class AllAreasComponent implements OnInit, OnDestroy {
  allAreas: Area[] = [];

  areasChangedSub: Subscription;

  constructor(private areasService: AreasService) {}

  ngOnInit(): void {
    this.allAreas = this.areasService.getAreas();
    this.areasChangedSub = this.areasService.areasChanged.subscribe(() => {
      this.allAreas = this.areasService.getAreas();
    });
  }

  ngOnDestroy() {
    this.areasChangedSub.unsubscribe();
  }
}
