import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { TableLoaderComponent } from './table-loader.component';

describe('TableLoaderComponent', () => {
  let component: TableLoaderComponent;
  let fixture: ComponentFixture<TableLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableLoaderComponent ],
      imports: [ MatCardModule, NgxSkeletonLoaderModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
