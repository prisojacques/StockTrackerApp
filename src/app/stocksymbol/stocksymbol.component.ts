import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TrackingService} from "../tracking.service";
import * as http from "http";
import {Quote} from "../modele/Quote";
import {lastValueFrom} from "rxjs";
import {Symbole} from "../modele/Symbole";

@Component({
  selector: 'app-stocksymbol',
  templateUrl: './stocksymbol.component.html',
  styleUrls: ['./stocksymbol.component.css']
})
export class StocksymbolComponent implements OnInit {



input = '';

  constructor(private trackingservice: TrackingService) {

  }

  ngOnInit(): void {
  }

  async trackStock() {
    this.input = ((<HTMLInputElement>document.getElementById('stockInput')).value);
    const responseQuote = await lastValueFrom(this.trackingservice.getQuote(this.input));
  this.addQuote(responseQuote);
  }

  async trackSymbolName() {
    this.input = ((<HTMLInputElement>document.getElementById('stockInput')).value);
    const responseSymbolName = await lastValueFrom(this.trackingservice.getSymbol(this.input));
    this.addSymbole(responseSymbolName);
    console.log(this.result2);
  }

     get result(){
    return this.trackingservice.result ??[] ;
     }
     get result2(){
    return this.trackingservice.result2 ??[];
     }
      addQuote(quote: Quote){
        this.result.push(quote);
      }
      addSymbole(symbole: {description: string, symbol: string}){
        this.result2.push(symbole);
      }
}
