import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AllAreasComponent } from './areas/all-areas/all-areas.component';
import { AreaComponent } from './areas/area/area.component';
import { AddAreaFormComponent } from './areas/add-area-form/add-area-form.component';
import { AllBuildingsComponent } from './buildings/all-buildings/all-buildings.component';
import { BuildingComponent } from './buildings/building/building.component';
import { AddBuildingFormComponent } from './buildings/add-building-form/add-building-form.component';
import { AllContractsComponent } from './contracts/all-contracts/all-contracts.component';
import { ContractComponent } from './contracts/contract/contract.component';
import { AddContractFormComponent } from './contracts/add-contract-form/add-contract-form.component';
import { AllReceiptsComponent } from './receipts/all-receipts/all-receipts.component';
import { ReceiptComponent } from './receipts/receipt/receipt.component';
import { AddReceiptFormComponent } from './receipts/add-receipt-form/add-receipt-form.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header/header.component';
import { MenuComponent } from './header/menu/menu.component';
import { MenuItemComponent } from './header/menu-item/menu-item.component';
import { RouterModule, Routes } from '@angular/router';
import { AreasComponent } from './areas/areas/areas.component';

const appRoutes: Routes = [
  {path: 'areas', component: AreasComponent, children: [
    {path: 'add-area', component: AddAreaFormComponent}
  ]}
]

@NgModule({
  declarations: [
    AppComponent,
    AllAreasComponent,
    AreaComponent,
    AddAreaFormComponent,
    AllBuildingsComponent,
    BuildingComponent,
    AddBuildingFormComponent,
    AllContractsComponent,
    ContractComponent,
    AddContractFormComponent,
    AllReceiptsComponent,
    ReceiptComponent,
    AddReceiptFormComponent,
    HeaderComponent,
    MenuComponent,
    MenuItemComponent,
    AreasComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
