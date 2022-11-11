import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProfileViewComponent } from './table-profile-view.component';

describe('TableProfileViewComponent', () => {
  let component: TableProfileViewComponent;
  let fixture: ComponentFixture<TableProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableProfileViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
