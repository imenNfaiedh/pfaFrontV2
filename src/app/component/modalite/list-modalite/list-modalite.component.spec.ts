import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModaliteComponent } from './list-modalite.component';

describe('ListModaliteComponent', () => {
  let component: ListModaliteComponent;
  let fixture: ComponentFixture<ListModaliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListModaliteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListModaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
