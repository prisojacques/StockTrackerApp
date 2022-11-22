import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  routeNavigate(symbol: string) {
    this.route.navigate(['sentiment/' + symbol]);
  }


  deleteById(i: number) :void{
    this.onDelete.emit(i);
  }
}
