import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/shared/menu-item.model';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css'],
})
export class BuildingsComponent implements OnInit {
  buildingsMenu: MenuItem[] = [
    new MenuItem(
      'Add building',
      'add-building',
      'glyphicon glyphicon-plus',
      'sub'
    ),
    new MenuItem(
      'View buildings',
      'view-buildings/all',
      'glyphicon glyphicon-home',
      'sub'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}
}
