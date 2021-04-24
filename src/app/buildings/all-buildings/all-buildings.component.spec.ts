import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBuildingsComponent } from './all-buildings.component';

describe('AllBuildingsComponent', () => {
  let component: AllBuildingsComponent;
  let fixture: ComponentFixture<AllBuildingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBuildingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
