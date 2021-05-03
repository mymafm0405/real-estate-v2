import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/shared/menu-item.model';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css'],
})
export class ReceiptsComponent implements OnInit {
  receiptsMenu: MenuItem[] = [
    new MenuItem(
      'View Payments',
      'all-payments',
      'glyphicon glyphicon-download-alt',
      'sub'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}
}
