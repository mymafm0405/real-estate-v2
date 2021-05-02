import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindContractComponent } from './find-contract.component';

describe('FindContractComponent', () => {
  let component: FindContractComponent;
  let fixture: ComponentFixture<FindContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
