import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StocksymbolComponent} from "./stocksymbol/stocksymbol.component";
import {SentimentComponent} from "./sentiment/sentiment.component";

const routes: Routes = [{
  path: '',
  redirectTo: 'stocksymbol',
  pathMatch: 'full'
},
  {
    path: 'stocksymbol',
    component: StocksymbolComponent,
  },
  {
    path: 'sentiment/:symbol',
    component: SentimentComponent
  }

]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],

   exports: [
     RouterModule
   ]


})
export class AppRoutingModule { }
