import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsByDateComponent } from './receipts-by-date.component';

describe('ReceiptsByDateComponent', () => {
  let component: ReceiptsByDateComponent;
  let fixture: ComponentFixture<ReceiptsByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptsByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptsByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
