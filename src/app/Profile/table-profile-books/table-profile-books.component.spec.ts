import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProfileBooksComponent } from './table-profile-books.component';

describe('TableProfileBooksComponent', () => {
  let component: TableProfileBooksComponent;
  let fixture: ComponentFixture<TableProfileBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableProfileBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableProfileBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
