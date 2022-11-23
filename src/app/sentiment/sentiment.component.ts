import {Component, Input, OnInit} from '@angular/core';
import {TrackingService} from "../tracking.service";
import {lastValueFrom} from "rxjs";
import {Month} from "../modele/Month";
import {ActivatedRoute, Router} from "@angular/router";

class InsiderSentiment {
  month !: string;
  change !: number;
  MSPR !: number;
}
@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {

  insiderSentiments : InsiderSentiment[] = [];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  @Input() input = '';

  result3: any;
  symbol !: string;
  month?: number;
  listMonth?: Month[];

  constructor(private api: TrackingService, private route: ActivatedRoute, private route1: Router) {
  }

  trackSentiment(symbol: string) {
    this.api.getSentimentEl(symbol).subscribe({
      next: (el) =>{
        el.data.forEach((element:{month: string | number; change: number; mspr: number;})=>{
          let insiderSentiment : InsiderSentiment = new InsiderSentiment();
          insiderSentiment.month = this.months[+element.month];
          insiderSentiment.change = element.change;
          insiderSentiment.MSPR = element.mspr;
          this.insiderSentiments.push(insiderSentiment);
        })

      }
    });

  }

  ngOnInit() {
    this.symbol = this.route.snapshot.params['symbol'];
    this.trackSentiment(this.symbol);
    console.log(this.insiderSentiments);

  }


  stockNavigate(){
    this.route1.navigate(['stocksymbol'])
  }
}
