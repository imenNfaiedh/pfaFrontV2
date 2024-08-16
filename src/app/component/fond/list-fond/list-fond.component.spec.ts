import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFondComponent } from './list-fond.component';

describe('ListFondComponent', () => {
  let component: ListFondComponent;
  let fixture: ComponentFixture<ListFondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
