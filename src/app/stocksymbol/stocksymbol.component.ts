import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TrackingService} from "../tracking.service";
import * as http from "http";
import {Quote} from "../modele/Quote";
import {forkJoin, lastValueFrom} from "rxjs";
import {Symbole} from "../modele/Symbole";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-stocksymbol',
  templateUrl: './stocksymbol.component.html',
  styleUrls: ['./stocksymbol.component.css']
})
export class StocksymbolComponent implements OnInit {

value!: string;
result2!: any [];
result!: Quote [];
search!: FormGroup;

  constructor(private trackingservice: TrackingService, private fb: FormBuilder) {
    this.search = this.fb.group({
        symbol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.result2 = this.trackingservice.getAllStocksData();
    this.result = this.trackingservice.getAllQuoteData();
  }


  trackStock() {
    this.value = this.search.controls["symbol"].value;
    console.log(" ---> " + this.value);

    this.trackingservice.getSymbol(this.value).subscribe({
      next: (response) => {
        this.result2 = this.trackingservice.getAllStocksData();
      }, error: (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    });

    this.trackingservice.getQuote(this.value).subscribe({
      next: (response) => {
        this.result = this.trackingservice.getAllQuoteData();
      }, error: (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    });

  }

  deleteStock(id: number) {
    this.result2 = this.trackingservice.deleteStockById(id);
    this.result = this.trackingservice.deleteQuoteById(id);
  }
}
