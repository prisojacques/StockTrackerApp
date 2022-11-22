import {Component, Input, OnInit} from '@angular/core';
import {TrackingService} from "../tracking.service";
import {lastValueFrom} from "rxjs";
import {Month} from "../modele/Month";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {

  @Input() input = '';

  result3: any;
  symbol?: string;
  month?: number;
  listMonth?: Month[];

  constructor(private api: TrackingService, private route: ActivatedRoute, private route1: Router) {
  }

  async trackSentiment() {
    this.result3 = await lastValueFrom(this.api.getSentiment(this.api.symbol));
    console.log(this.result3);
  }

  async ngOnInit() {
    this.trackSentiment();
    console.log('symbol' + this.api.symbol);
    this.symbol = this.route.snapshot.paramMap.get('symbol')??'';
    const response = (await lastValueFrom(this.api.getSentiment(this.symbol)));
    this.listMonth = response.data;
  }


  stockNavigate(){
    this.route1.navigate(['stocksymbol'])
  }
}
