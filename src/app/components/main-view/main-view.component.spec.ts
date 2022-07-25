import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { DataServiceService } from 'src/app/services/data-service.service';
import { MainViewComponent } from './main-view.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { TableLoaderComponent } from '../table-loader/table-loader.component';
import { Stocks } from 'src/app/models/stocks';
import { StockValues } from 'src/app/models/stockValues';

describe('MainViewComponent', () => {
  let component: MainViewComponent;
  let fixture: ComponentFixture<MainViewComponent>;
  let dataService: DataServiceService;

  let mockStock: [Stocks] = [
    {
      id: 1,
      currency_code: 'USD',
      industry: 'Technology',
      sector: 'Software',
      stock: 'Angular'
    }
  ];

  let mockValues: [StockValues] = [
    {
      stock_id: 1,
      date: '20/01/2020',
      value: 5
    }
  ];

  class DataServiceStub {
    getStocks() { return of(mockStock); }
    getStockValues() { return of(mockValues); }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainViewComponent, TableLoaderComponent, NavbarComponent ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        NgxSkeletonLoaderModule],
      providers: [MatBottomSheet,
      {provide: DataServiceService, useClass: DataServiceStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dataService = fixture.debugElement.injector.get(DataServiceService);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial stocks and initial stocks values', () => {
    spyOn(component, 'initiateTables').and.callThrough();
    spyOn(dataService, 'getStocks').and.returnValues(of(mockStock));
    spyOn(dataService, 'getStockValues').and.returnValues(of(mockValues));

    expect(component.dataSource.data.length).toBeGreaterThan(0);
    expect(component.dataSource.data[0].id).toBe(mockStock[0].id);
    expect(component.stockValues[0].stock_id).toBe(mockValues[0].stock_id)
  });

  it('should render main components', () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.debugElement.query(By.css('.container')).nativeElement;
    const title: HTMLElement = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    const table: HTMLElement = fixture.debugElement.query(By.css('table')).nativeElement;

    expect(element.innerHTML).toBeTruthy();
    expect(title.innerHTML).toBe('Stocks');
    expect(table.innerHTML).toBeTruthy();
  });

  it('should render a MatBottomSheet after calling openBottomSheet', () => {
    const noBottomSheet = document.getElementsByClassName('bottom-sheet')[0] as HTMLElement;
    expect(noBottomSheet).toBeFalsy();

    const app = fixture.componentInstance;
    app.openBottomSheet();
    fixture.detectChanges();

    const bottomSheet = document.getElementsByClassName('bottom-sheet')[0] as HTMLElement;
    expect(bottomSheet.innerHTML).toBeTruthy();

    const overlay = document.getElementsByClassName('cdk-overlay-backdrop')[0] as HTMLElement;
    overlay.click();
  });
});
