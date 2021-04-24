import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBuildingFormComponent } from './add-building-form.component';

describe('AddBuildingFormComponent', () => {
  let component: AddBuildingFormComponent;
  let fixture: ComponentFixture<AddBuildingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBuildingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBuildingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
