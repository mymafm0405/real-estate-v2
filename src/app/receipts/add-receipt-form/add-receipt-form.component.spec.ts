import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceiptFormComponent } from './add-receipt-form.component';

describe('AddReceiptFormComponent', () => {
  let component: AddReceiptFormComponent;
  let fixture: ComponentFixture<AddReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReceiptFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
