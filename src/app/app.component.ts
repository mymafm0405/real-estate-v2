import { AreasService } from './shared/areas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'real-estate-v2';

  constructor(private areasService: AreasService) {}

  ngOnInit() {
    this.areasService.loadAreas();
  }
}
