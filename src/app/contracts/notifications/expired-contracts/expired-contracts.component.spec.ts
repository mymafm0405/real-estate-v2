import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredContractsComponent } from './expired-contracts.component';

describe('ExpiredContractsComponent', () => {
  let component: ExpiredContractsComponent;
  let fixture: ComponentFixture<ExpiredContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
