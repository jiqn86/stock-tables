import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Stocks } from '../models/stocks';
import { StockValues } from '../models/stockValues';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });

  /**
   * Gets the initial stocks list
   *
   * @returns Observable<[Stocks]>
   */
  getStocks(): Observable<[Stocks]> {
    const stocks = 'assets/data/Stocks.json';
    return this.http.get<[Stocks]>(stocks, { headers: this.reqHeader }).
    pipe(
      map((stock: any) => {
        return stock;
      })
    );
  }

  /**
   * Gets the full list of stocks values
   *
   * @returns Observable<[StockValues]>
   */
  getStockValues(): Observable<[StockValues]> {
    const stocks = 'assets/data/StockValues.json';
    return this.http.get<[StockValues]>(stocks, { headers: this.reqHeader }).
    pipe(
      map((stock: any) => {
        return stock;
      })
    );
  }
}
