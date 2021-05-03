import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindReceiptComponent } from './find-receipt.component';

describe('FindReceiptComponent', () => {
  let component: FindReceiptComponent;
  let fixture: ComponentFixture<FindReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
