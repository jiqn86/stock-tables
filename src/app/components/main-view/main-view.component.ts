import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import exportFromJSON from 'export-from-json'
import { DataServiceService } from 'src/app/services/data-service.service';
import { BottomSheetComponent} from '../bottom-sheet/bottom-sheet.component'

import { Stocks } from '../../models/stocks';
import { StockValues } from '../../models/stockValues';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements AfterViewInit, OnInit{

  @ViewChild('stocksPaginator') stocksPaginator: MatPaginator;
  @ViewChild('stocksSort') stocksSort: MatSort;
  @ViewChild('valuesPaginator') valuesPaginator: MatPaginator;
  @ViewChild('valuesSort') valuesSort: MatSort;
  displayedColumns: string[] = ['id', 'stock', 'industry', 'sector', 'currency_code'];
  displayedValuesColumns: string[] = ['id', 'date', 'value'];
  dataSource: MatTableDataSource<Stocks> = new MatTableDataSource([]);
  dataSourceValues: MatTableDataSource<StockValues>;

  clickedRows = new Set<Stocks>();
  isLoading = false;
  matchedValues: StockValues[] = [];
  previousId: number;
  showValuesTable = false;
  stockName = '';
  stockValues: StockValues[] = [];

  constructor(private _bottomSheet: MatBottomSheet,
              private cdRef:ChangeDetectorRef,
              private dataService: DataServiceService) {
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.initiateTables();
  }

  /**
   * Angular life cycle hook
   */
  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  /**
   * Adds the fade out animation and clean the values used in the table.
   *
   * @param valuesTable The second table containing the values of the stock
   */
  private cleanTable(valuesTable: HTMLCollectionOf<Element>): void {
    valuesTable[0].classList.remove('animate__fadeIn');
    valuesTable[0].classList.add('animate__fadeOut');
    setTimeout(() => {
      this.stockName = '';
      this.matchedValues = [];
      console.log(this.matchedValues)
      this.showValuesTable = false;
    }, 1000);
  }

  /**
   * Loads data to the main table and loads in memory the stocks values
   * @return void
   */
  initiateTables(): void {
    this.dataService.getStocks().subscribe(
      (stocksResponse: [Stocks]) => {
        this.dataSource = new MatTableDataSource(stocksResponse);
        this.dataSource.paginator = this.stocksPaginator;
        this.dataSource.sort = this.stocksSort;
      }
      );

      this.dataService.getStockValues().subscribe(
        (valuesResponse: [StockValues]) => {
          this.stockValues = valuesResponse;
        }
      );

      // Implement set timeout to simulate server call
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
  }

  /**
   * Searches for the corresponding values of the stock table
   * and displays them
   *
   * @param event The click event
   * @param row to row info
   * @param valuesTable the table with the stock values
   */
  private prepareTable(event: Event,
              row: Stocks,
              valuesTable: HTMLCollectionOf<Element>): void {
    this.matchedValues = [];
    const target = event.target as Element;
    target.parentElement.classList.add('active');
    this.stockName = row.stock;
    this.previousId = row.id;
    this.stockValues.forEach(stock => {
      if (stock.stock_id === row.id) {
        this.matchedValues.push(stock);
      }
    });
    this.showValuesTable = true;
    valuesTable[0].classList.remove('animate__fadeOut');
    valuesTable[0].classList.add('animate__fadeIn');
  }

  /**
   * Filters the result on the main table
   *
   * @param event The keyboard event
   */
  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Exports current values into a .json file
   */
  public exportJsonFile(): void {
    const fileName = this.stockName.replace(/[^\w]/g, '');
    const exportType = 'json';
    exportFromJSON({ data: this.matchedValues, fileName, exportType });
  }

  /**
   * Cool stuff to show some cool info
   */
  public openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }

  /**
   * Looks for the corresponding stock and displays its values.
   *
   * @param event the event on the main table
   * @param row the information of the row
   * @return void
   */
  public showStock(event: Event, row: Stocks): void {
    const activeRows = document.getElementsByClassName('mat-row cdk-row ng-star-inserted active');
    const valuesTable = document.getElementsByClassName('values-table');
    if (this.previousId) {
      if (activeRows.length > 0) {
        activeRows[0].classList.remove('active');
      }
    }

    if (this.previousId === row.id && this.stockName !== '') {
      this.cleanTable(valuesTable);
    } else {
      this.prepareTable(event, row, valuesTable);
    }
    this.dataSourceValues = new MatTableDataSource(this.matchedValues);
    this.dataSourceValues.paginator = this.valuesPaginator;
    this.dataSourceValues.sort = this.valuesSort;
  }

}
