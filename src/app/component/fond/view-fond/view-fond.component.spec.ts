import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFondComponent } from './view-fond.component';

describe('ViewFondComponent', () => {
  let component: ViewFondComponent;
  let fixture: ComponentFixture<ViewFondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
