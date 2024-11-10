import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresEditComponent } from './measures-edit.component';

describe('MeasuresEditComponent', () => {
  let component: MeasuresEditComponent;
  let fixture: ComponentFixture<MeasuresEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasuresEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
