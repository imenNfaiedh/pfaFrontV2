import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFondComponent } from './add-fond.component';

describe('AddFondComponent', () => {
  let component: AddFondComponent;
  let fixture: ComponentFixture<AddFondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
