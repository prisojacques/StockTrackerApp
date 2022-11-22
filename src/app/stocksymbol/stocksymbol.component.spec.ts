import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksymbolComponent } from './stocksymbol.component';

describe('StocksymbolComponent', () => {
  let component: StocksymbolComponent;
  let fixture: ComponentFixture<StocksymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksymbolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StocksymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
