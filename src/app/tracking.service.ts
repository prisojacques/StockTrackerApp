import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Quote} from "./modele/Quote";
import {Symbole} from "./modele/Symbole";
import {Month} from "./modele/Month"
import {SentimentComponent} from "./sentiment/sentiment.component";
import {SentimentResponse} from "./modele/SentimentResponse";
@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  symbol = '';
  constructor(private httpClient: HttpClient) {
  }

  private token = 'bu4f8kn48v6uehqi3cqg';
  private basisUrl = 'https://finnhub.io/api/v1/quote?token=' + this.token + '&symbol=';
  private stockName = 'https://finnhub.io/api/v1/search?q=token=' + this.token + '&symbol=';


  result : Quote[]= [];
  result2: any [] = [];

  getQuote(symbol: string): Observable<Quote> {
    this.symbol = symbol;
    return this.httpClient.get<Quote>(this.basisUrl + symbol);

  }



  getSymbol(symbol: string): Observable<{description: string, symbol: string}> {
    return this.httpClient.get<Symbole>(`https://finnhub.io/api/v1/search?q=${symbol}&token=${this.token}`)
      .pipe(
        map((symbole) => {
          return {
            "description": symbole.result[0].description,
            "symbol": symbole.result[0].symbol
          }
        })
      );
  }

  getSentiment(symbol: string): Observable<SentimentResponse> {
    return this.httpClient.get<SentimentResponse>(`https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${symbol}&from=2022-09-19&to=2022-11-19&token=${this.token}`);
  }
}






