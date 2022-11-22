import {Inject, inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Quote} from "./modele/Quote";
import {Symbole} from "./modele/Symbole";
import {Month} from "./modele/Month"
import {SentimentComponent} from "./sentiment/sentiment.component";
import { SESSION_STORAGE, StorageService } from "ngx-webstorage-service";
import {SentimentResponse} from "./modele/SentimentResponse";
@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  value : []= [];
  symbol = '';
  constructor(private httpClient: HttpClient,
    @Inject(SESSION_STORAGE)
    public storage: StorageService) {
  }

  private token = 'bu4f8kn48v6uehqi3cqg';
  private basisUrl = 'https://finnhub.io/api/v1/quote?token=' + this.token + '&symbol=';
  private stockName = 'https://finnhub.io/api/v1/search?q=token=' + this.token + '&symbol=';
  JSONDataStockQuote: any;

  result : Quote[]= [];
  result2!: {description: string, symbol: string};

  getQuote(symbol: string): Observable<Quote> {
    return this.httpClient.get<Quote>(this.basisUrl + symbol)
      .pipe(
        tap((data => {

          this.JSONDataStockQuote = {
            "c": data.c,
            "d": data.d,
            "dp": data.dp,
            "h": data.h,
            "l": data.l,
            "o": data.o,
            "pc": data.pc,
            "t": data.t
          };

          const quoteData = this.storage.get('currentQuoteData') ?? [];
          quoteData.push(this.JSONDataStockQuote);
          this.storage.set('currentQuoteData', quoteData);
        }))
      );

  }



  getSymbol(symbol: string): Observable<void> {
    return this.httpClient.get<Symbole>(`https://finnhub.io/api/v1/search?q=${symbol}&token=${this.token}`)
      .pipe(
        map((symbole) => {
          this.result2 = {
            "description": symbole.result[0].description,
            "symbol": symbole.result[0].symbol
          }

          const stocksData = this.storage.get('stockData') ?? [];
          stocksData.push(this.result2);
          this.storage.set('stockData', stocksData);
        })
      );
  }

  getSentiment(symbol: string): Observable<SentimentResponse> {
    return this.httpClient.get<SentimentResponse>(`https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${symbol}&from=2022-08-01&to=2022-10-01&token=${this.token}`)
      .pipe(
        tap((data => {
          const sentimentData = this.storage.get('sentimentData') ?? [];
          sentimentData.push(sentimentData);
          this.storage.set('stockData', sentimentData);
        }))
      );
  }
  removeStock(){

  }

  addStock(){

  }

  localstorage(){
    const response =  localStorage.getItem('symbol');
    return response != null ? JSON.parse(response): [];
  }

  deleteStockById(id: number): any [] {
    const stocksData = this.storage.get('stockData');
    stocksData.splice(id, 1);
    this.storage.set('stockData', stocksData);
    return stocksData;
  }

  deleteQuoteById(id: number): any [] {
    const stocksData = this.storage.get('currentQuoteData');
    stocksData.splice(id, 1);
    this.storage.set('currentQuoteData', stocksData);
    return stocksData;
  }

  getAllStocksData(): any [] {
    //result2
    return this.storage.get('stockData');
  }

  getAllQuoteData(): any [] {
    //result
    return this.storage.get('currentQuoteData');
  }
}






