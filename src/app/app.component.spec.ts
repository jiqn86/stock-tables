import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSortModule } from '@angular/material/sort';
import { AppComponent } from './app.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { TableLoaderComponent } from './components/table-loader/table-loader.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MainViewComponent,
        MatPaginator,
        NavbarComponent,
        TableLoaderComponent
      ],
      imports: [
        HttpClientModule,
        MatBottomSheetModule,
        MatCardModule,
        MatFormFieldModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        NgxSkeletonLoaderModule
      ],
      providers: [
        MatBottomSheet
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'stock-tables'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('stock-tables');
  });
});
