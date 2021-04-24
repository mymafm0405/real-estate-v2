import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReceiptsComponent } from './all-receipts.component';

describe('AllReceiptsComponent', () => {
  let component: AllReceiptsComponent;
  let fixture: ComponentFixture<AllReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllReceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
