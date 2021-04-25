import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/shared/menu-item.model';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css'],
})
export class AreasComponent implements OnInit {
  areasMenu: MenuItem[] = [
    new MenuItem('Add area', 'add-area', 'glyphicon glyphicon-plus', 'sub'),
    new MenuItem(
      'View areas',
      'view-areas',
      'glyphicon glyphicon-list-alt',
      'sub'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}
}
