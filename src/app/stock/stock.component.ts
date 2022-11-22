import {Component, Input, OnInit} from '@angular/core';
import {Quote} from "../modele/Quote";
import {Symbole} from "../modele/Symbole";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  @Input() input= '';
  @Input() quote!: Quote [];
  @Input() symbol!: any [];

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  routeNavigate(symbol: string) {
    this.route.navigate(['sentiment/' + symbol]);
  }


}
