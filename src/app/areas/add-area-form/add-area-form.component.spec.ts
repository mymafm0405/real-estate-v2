import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAreaFormComponent } from './add-area-form.component';

describe('AddAreaFormComponent', () => {
  let component: AddAreaFormComponent;
  let fixture: ComponentFixture<AddAreaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAreaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAreaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
