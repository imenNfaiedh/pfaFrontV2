import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPartenaireComponent } from './view-partenaire.component';

describe('ViewPartenaireComponent', () => {
  let component: ViewPartenaireComponent;
  let fixture: ComponentFixture<ViewPartenaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPartenaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
